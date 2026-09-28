import DOMPurify from 'dompurify';
import type { DocumentData } from '../types/document';
import type { ASTDocumentTree, ASTNode } from '../types/ast';

export const exportService = {
  /**
   * Generates sanitized HTML representation of the document blocks
   */
  generateSanitizedHtml(doc: DocumentData): string {
    const rawHtml = doc.blocks
      .map((block) => {
        switch (block.type) {
          case 'heading': {
            const level = block.level || 1;
            return `<h${level}>${block.content}</h${level}>`;
          }
          case 'code':
            return `<pre><code class="language-${block.language || 'text'}">${block.content}</code></pre>`;
          case 'list': {
            const items = block.content
              .split('\n')
              .filter(Boolean)
              .map((line) => `<li>${line}</li>`)
              .join('');
            return block.listType === 'ordered' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
          }
          case 'quote':
            return `<blockquote>${block.content}</blockquote>`;
          case 'divider':
            return '<hr />';
          case 'paragraph':
          default:
            return `<p>${block.content}</p>`;
        }
      })
      .join('\n');

    return DOMPurify.sanitize(rawHtml);
  },

  /**
   * Generates hierarchical AST JSON structure for exporting
   */
  generateAstTree(doc: DocumentData): ASTDocumentTree {
    const children: ASTNode[] = doc.blocks.map((block) => ({
      id: block.id,
      type: block.type,
      label: block.content.slice(0, 32) + (block.content.length > 32 ? '...' : ''),
      depth: 1,
      properties: {
        level: block.level,
        charCount: block.content.length,
        language: block.language,
        listType: block.listType,
        order: block.order,
        version: block.metadata?.version || 1,
      },
      activeUser: block.metadata?.remoteUserEditing,
      activeColor: block.metadata?.remoteUserColor,
    }));

    return {
      documentId: doc.id,
      version: doc.version,
      root: {
        id: 'root_doc',
        type: 'document',
        label: doc.title,
        depth: 0,
        properties: {
          totalBlocks: doc.blocks.length,
          lastEditedBy: doc.lastEditedBy,
        },
        children,
      },
      totalNodes: children.length + 1,
    };
  },

  /**
   * Downloads formatted AST JSON
   */
  exportJsonAst(doc: DocumentData): void {
    const ast = this.generateAstTree(doc);
    const blob = new Blob([JSON.stringify(ast, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_ast.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  /**
   * Downloads clean HTML file
   */
  exportHtml(doc: DocumentData): void {
    const content = this.generateSanitizedHtml(doc);
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${doc.title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
    h1, h2, h3 { color: #0f172a; margin-top: 1.5em; margin-bottom: 0.5em; }
    pre { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 8px; overflow-x: auto; }
    blockquote { border-left: 4px solid #3b82f6; margin: 0; padding-left: 16px; color: #475569; font-style: italic; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 32px 0; }
  </style>
</head>
<body>
  <h1>${doc.title}</h1>
  ${content}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.html`;
    link.click();
    URL.revokeObjectURL(url);
  },

  /**
   * Triggers browser print dialog formatted for PDF export
   */
  exportPdf(): void {
    window.print();
  },
};
