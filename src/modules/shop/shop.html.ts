export class ShopHtml {
  private static readonly translations = {
    'zh-TW': {
      htmlLang: 'zh-TW',
      pageTitleSuffix: '菜單',
      menuBadge: '菜單',
      contactLabel: '電話',
      emptyState: '這間商店目前還沒有上架任何商品。',
      languageLabel: '語言',
      languages: {
        'zh-TW': '繁體中文',
        en: 'English',
        ja: '日本語',
        ko: '한국어',
      },
    },
    en: {
      htmlLang: 'en',
      pageTitleSuffix: 'Menu',
      menuBadge: 'Menu',
      contactLabel: 'Tel',
      emptyState: 'This shop does not have any commodities yet.',
      languageLabel: 'Language',
      languages: {
        'zh-TW': '繁體中文',
        en: 'English',
        ja: '日本語',
        ko: '한국어',
      },
    },
    ja: {
      htmlLang: 'ja',
      pageTitleSuffix: 'メニュー',
      menuBadge: 'メニュー',
      contactLabel: '電話',
      emptyState: 'この店舗にはまだ商品がありません。',
      languageLabel: '言語',
      languages: {
        'zh-TW': '繁體中文',
        en: 'English',
        ja: '日本語',
        ko: '한국어',
      },
    },
    ko: {
      htmlLang: 'ko',
      pageTitleSuffix: '메뉴',
      menuBadge: '메뉴',
      contactLabel: '전화',
      emptyState: '이 매장에는 아직 등록된 상품이 없습니다.',
      languageLabel: '언어',
      languages: {
        'zh-TW': '繁體中文',
        en: 'English',
        ja: '日本語',
        ko: '한국어',
      },
    },
  } as const;

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
      uuid: string;
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
    lang?: 'zh-TW' | 'en' | 'ja' | 'ko';
  }): string {
    const { shop, commodities } = params;
    const selectedLang = params.lang && params.lang in this.translations ? params.lang : 'zh-TW';
    const locale = this.translations[selectedLang];
    const description = shop.introduction
      ? `<p class="shop-introduction">${this.escapeHtml(shop.introduction)}</p>`
      : '';
    const phones = [shop.localPhoneNumber, shop.mobilePhoneNumber]
      .filter((value): value is string => Boolean(value))
      .map((value) => this.escapeHtml(value));

    const contact =
      phones.length > 0
        ? `<p class="shop-contact">${this.escapeHtml(locale.contactLabel)}: ${phones.join(' / ')}</p>`
        : '';
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
        : `<p class="empty-state">${this.escapeHtml(locale.emptyState)}</p>`;

    const languageButtons = Object.entries(locale.languages)
      .map(
        ([code, label]) => `
          <a href="/shop/${this.escapeHtml(shop.uuid)}/menu?lang=${this.escapeHtml(code)}" class="lang-button${code === selectedLang ? ' is-active' : ''}">
            ${this.escapeHtml(label)}
          </a>
        `
      )
      .join('');

    return `<!DOCTYPE html>
    <html lang="${locale.htmlLang}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${this.escapeHtml(shop.name)} ${this.escapeHtml(locale.pageTitleSuffix)}</title>
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

          .menu-topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .menu-badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(180, 83, 9, 0.12);
            color: var(--accent);
            font-size: 0.9rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .language-switcher {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .language-label {
            color: #6b7280;
            font-size: 0.95rem;
          }

          .language-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .lang-button {
            display: inline-flex;
            align-items: center;
            border: 1px solid var(--line);
            background: rgba(255, 255, 255, 0.72);
            color: var(--ink);
            border-radius: 999px;
            padding: 8px 12px;
            font: inherit;
            text-decoration: none;
            transition:
              background-color 180ms ease,
              color 180ms ease,
              border-color 180ms ease,
              transform 180ms ease;
          }

          .lang-button:hover {
            transform: translateY(-1px);
            border-color: rgba(180, 83, 9, 0.45);
          }

          .lang-button.is-active {
            background: var(--accent);
            color: #fff;
            border-color: var(--accent);
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

          @media (max-width: 640px) {
            .menu {
              padding: 28px 20px;
            }

            .menu-item {
              flex-direction: column;
              gap: 10px;
            }

            .item-price {
              white-space: normal;
            }
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
          <div class="menu-topbar">
            <span class="menu-badge">${this.escapeHtml(locale.menuBadge)}</span>
            <div class="language-switcher">
              <span class="language-label">${this.escapeHtml(locale.languageLabel)}</span>
              <div class="language-buttons">
                ${languageButtons}
              </div>
            </div>
          </div>
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
