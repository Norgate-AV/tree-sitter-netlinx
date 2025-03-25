#!/usr/bin/env pwsh

[CmdletBinding()]

param (
    [Parameter(Mandatory = $false, Position = 0)]
    [string]$Path = ".",

    [Parameter(Mandatory = $false)]
    [switch]$LogErrors,

    [Parameter(Mandatory = $false)]
    [string]$LogPath = "./parse-errors.log"
)

try {
    $Path = Resolve-Path $Path

    Write-Host "Searching for .axs and .axi files in $Path..."

    $axsFiles = Get-ChildItem -Path $Path -Recurse -File -Filter "*.axs" -ErrorAction SilentlyContinue
    $axiFiles = Get-ChildItem -Path $Path -Recurse -File -Filter "*.axi" -ErrorAction SilentlyContinue

    $files = @($axsFiles) + @($axiFiles) | Where-Object { $_.FullName -notmatch "(.git|.history|node_modules|disabled)" }

    if (!$files) {
        Write-Host "No files found in $Path"
        exit 0
    }

    $totalFiles = $files.Count
    $successCount = 0
    $failCount = 0
    $failedFiles = @()
    $i = 0

    $startTime = Get-Date

    Write-Host "Parsing $totalFiles files..."

    # Parse each file
    foreach ($file in $files) {
        $i++
        $percentComplete = [math]::Round(($i / $totalFiles) * 100, 1)
        Write-Progress -Activity "Parsing Files" -Status "$i of $totalFiles ($percentComplete%)" -PercentComplete $percentComplete

        Write-Verbose "Parsing $($file.FullName)..."
        try {
            $null = & tree-sitter parse $file.FullName --quiet 2>&1
            if ($LASTEXITCODE -eq 0) {
                $successCount++
            }
            else {
                $failCount++
                $failedFiles += $file.FullName
            }
        }
        catch {
            $failCount++
            $failedFiles += $file.FullName
            Write-Verbose "Error parsing $($file.FullName): $($_.Exception.Message)"
        }
    }

    Write-Progress -Activity "Parsing Files" -Completed

    $endTime = Get-Date
    $duration = $endTime - $startTime
    $formattedTime = "{0:mm\:ss\.fff}" -f $duration
    $filesPerSecond = [math]::Round($totalFiles / $duration.TotalSeconds, 2)

    $summaryObject = [PSCustomObject]@{
        TotalFiles        = $totalFiles
        SuccessCount      = $successCount
        FailCount         = $failCount
        Duration          = $duration
        DurationFormatted = $formattedTime
        FilesPerSecond    = $filesPerSecond
        FailedFiles       = $failedFiles
        StartTime         = $startTime
        EndTime           = $endTime
        Status            = if ($failCount -gt 0) { "Failed" } else { "Success" }
    }

    # Output the object
    $summaryObject

    if ($LogErrors -and $failCount -gt 0) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

        "[$timestamp] Parse Errors" | Out-File -FilePath $LogPath
        "Total files: $totalFiles" | Out-File -FilePath $LogPath -Append
        "Failed files: $failCount" | Out-File -FilePath $LogPath -Append

        foreach ($failedFile in $failedFiles) {
            "  - $failedFile" | Out-File -FilePath $LogPath -Append
        }
    }

    if ($failCount -gt 0) {
        exit 1
    }
}
catch {
    Write-Host $_.Exception.GetBaseException().Message -ForegroundColor Red
    exit 1
}
