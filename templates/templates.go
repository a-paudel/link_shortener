package templates

import "embed"

//go:embed www/*
var EmbeddedHtml embed.FS
