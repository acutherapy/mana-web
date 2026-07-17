<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap | Mana Reset</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1e293b;
            background-color: #fcfbfa;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: #ffffff;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
            border: 1px solid #f1f0ec;
          }
          h1 {
            font-family: Georgia, Cambria, "Times New Roman", Times, serif;
            font-size: 32px;
            font-weight: normal;
            color: #0c2340;
            margin-top: 0;
            margin-bottom: 10px;
          }
          p {
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .info-box {
            background-color: #f7f6f2;
            border-left: 4px solid #0c2340;
            padding: 15px 20px;
            margin-bottom: 30px;
            border-radius: 0 12px 12px 0;
            font-size: 14px;
            color: #475569;
          }
          .info-box a {
            color: #0c2340;
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            text-align: left;
            padding: 12px 16px;
            border-bottom: 2px solid #e2e8f0;
            color: #475569;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          td {
            padding: 16px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 14px;
            word-break: break-all;
          }
          tr:hover td {
            background-color: #fbfbf9;
          }
          a {
            color: #0c2340;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            color: #3b82f6;
            text-decoration: underline;
          }
          .priority-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            background-color: #e0f2fe;
            color: #0369a1;
          }
          .priority-high {
            background-color: #dcfce7;
            color: #15803d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Mana Reset Sitemap</h1>
          <p>This is a human-readable XML Sitemap generated for search engines like Google or Bing to discover all indexable pages of the website.</p>
          
          <div class="info-box">
            Number of URLs in this sitemap: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>. 
            Back to <a href="https://www.manareset.com/">manareset.com</a>.
          </div>
          
          <table>
            <thead>
              <tr>
                <th width="65%">URL</th>
                <th width="15%">Priority</th>
                <th width="20%">Change Freq</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span>
                      <xsl:attribute name="class">
                        <xsl:text>priority-badge</xsl:text>
                        <xsl:if test="sitemap:priority &gt;= 0.9">
                          <xsl:text> priority-high</xsl:text>
                        </xsl:if>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
