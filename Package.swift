// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterNetlinx",
    products: [
        .library(name: "TreeSitterNetlinx", targets: ["TreeSitterNetlinx"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterNetlinx",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterNetlinxTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterNetlinx",
            ],
            path: "bindings/swift/TreeSitterNetlinxTests"
        )
    ],
    cLanguageStandard: .c11
)
