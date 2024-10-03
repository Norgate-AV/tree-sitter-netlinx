package tree_sitter_netlinx_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_netlinx "github.com/tree-sitter/tree-sitter-netlinx/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_netlinx.Language())
	if language == nil {
		t.Errorf("Error loading Netlinx grammar")
	}
}
