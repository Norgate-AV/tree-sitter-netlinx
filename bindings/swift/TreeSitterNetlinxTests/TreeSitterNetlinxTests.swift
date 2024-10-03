import XCTest
import SwiftTreeSitter
import TreeSitterNetlinx

final class TreeSitterNetlinxTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_netlinx())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Netlinx grammar")
    }
}
