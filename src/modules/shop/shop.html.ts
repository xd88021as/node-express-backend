export class ShopHtml {
  private static escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  static renderMenuHtml(params: {
    shop: {
      name: string;
      introduction?: string | null;
      localPhoneNumber?: string | null;
      mobilePhoneNumber?: string | null;
    };
    commodities: Array<{
      name: string;
      introduction?: string | null;
      currency: string;
      price: string;
    }>;
  }): string {
    const { shop, commodities } = params;
    const description = shop.introduction
      ? `<p class="shop-introduction">${this.escapeHtml(shop.introduction)}</p>`
      : '';
    const phones = [shop.localPhoneNumber, shop.mobilePhoneNumber]
      .filter((value): value is string => Boolean(value))
      .map((value) => this.escapeHtml(value));

    const contact =
      phones.length > 0 ? `<p class="shop-contact">Tel: ${phones.join(' / ')}</p>` : '';
    const itemsHtml =
      commodities.length > 0
        ? commodities
            .map((commodity) => {
              const intro = commodity.introduction
                ? `<p class="item-introduction">${this.escapeHtml(commodity.introduction)}</p>`
                : '';
              return `
                    <article class="menu-item">
                      <div class="item-main">
                        <h2>${this.escapeHtml(commodity.name)}</h2>
                        ${intro}
                      </div>
                      <div class="item-price">${this.escapeHtml(commodity.currency)} ${this.escapeHtml(commodity.price)}</div>
                    </article>
                  `;
            })
            .join('')
        : '<p class="empty-state">This shop does not have any commodities yet.</p>';

    return `<!DOCTYPE html>
    <html lang="zh-Hant">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${this.escapeHtml(shop.name)} Menu</title>
        <style>
          :root {
            color-scheme: light;
            --paper: #f8f4ec;
            --ink: #1f2937;
            --accent: #b45309;
            --line: #d6c6a8;
          }
    
          * {
            box-sizing: border-box;
          }
    
          body {
            margin: 0;
            padding: 32px 20px;
            background:
              radial-gradient(circle at top, rgba(180, 83, 9, 0.18), transparent 32%),
              linear-gradient(180deg, #f7efe2 0%, var(--paper) 100%);
            color: var(--ink);
            font-family: Georgia, "Times New Roman", serif;
          }
    
          .menu {
            max-width: 820px;
            margin: 0 auto;
            background: rgba(255, 252, 245, 0.88);
            border: 1px solid var(--line);
            border-radius: 24px;
            padding: 40px 28px;
            box-shadow: 0 20px 60px rgba(31, 41, 55, 0.08);
          }
    
          .shop-name {
            margin: 0;
            font-size: clamp(2rem, 5vw, 3.25rem);
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }
    
          .shop-introduction,
          .shop-contact {
            margin: 12px 0 0;
            line-height: 1.7;
            color: #4b5563;
          }
    
          .divider {
            margin: 28px 0 24px;
            border: none;
            border-top: 1px solid var(--line);
          }
    
          .menu-list {
            display: grid;
            gap: 18px;
          }
    
          .menu-item {
            display: flex;
            justify-content: space-between;
            gap: 24px;
            padding-bottom: 18px;
            border-bottom: 1px dashed var(--line);
          }
    
          .menu-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
    
          .item-main h2 {
            margin: 0;
            font-size: 1.35rem;
          }
    
          .item-introduction {
            margin: 8px 0 0;
            line-height: 1.6;
            color: #6b7280;
          }
    
          .item-price {
            white-space: nowrap;
            font-weight: 700;
            color: var(--accent);
            font-size: 1.1rem;
          }
    
          .empty-state {
            margin: 0;
            color: #6b7280;
          }
    
          @media print {
            body {
              background: #fff;
              padding: 0;
            }
    
            .menu {
              box-shadow: none;
              border: none;
              max-width: none;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <main class="menu">
          <header>
            <h1 class="shop-name">${this.escapeHtml(shop.name)}</h1>
            ${description}
            ${contact}
          </header>
          <hr class="divider" />
          <section class="menu-list">
            ${itemsHtml}
          </section>
        </main>
      </body>
    </html>`;
  }
}
