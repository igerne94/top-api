import { ConfigService } from '@nestjs/config';
import { TopPageService } from './../top-page/top-page.service';
import { Controller, Get, Header } from '@nestjs/common';
import { subDays, format } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';

@Controller('sitemap')
export class SitemapController {
  domain: string;

  constructor(
    private readonly topPageService: TopPageService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('DOMAIN') ?? '';
  }

  // Robots crawl the site using Get
  @Get('xml')
  @Header('Content-Type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
    const urlsRes: Array<{
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }> = [
      {
        loc: `${this.domain}`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        loc: `${this.domain}/courses`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '0.8',
      },
    ];

    // Fetch all top-pages
    const pagesArr = await this.topPageService.getAll();

    // Map over pagesArr, but guard updatedAt carefully:
    const pageUrls = pagesArr.map((page) => {
      let lastModDate: Date;

      if (page.updatedAt) {
        const parsed = new Date(page.updatedAt);
        if (isNaN(parsed.getTime())) {
          // Log which page had an invalid updatedAt
          console.warn(
            `[Sitemap] Invalid updatedAt for page id=${page._id}:`,
            page.updatedAt,
          );
          lastModDate = new Date();
        } else {
          lastModDate = parsed;
        }
      } else {
        // Log missing updatedAt entirely
        console.warn(
          `[Sitemap] Missing updatedAt for page id=${page._id}. Falling back to now.`,
        );
        lastModDate = new Date();
      }

      return {
        loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
        lastmod: format(lastModDate, formatString),
        changefreq: 'weekly',
        priority: '0.7',
      };
    });

    const allUrls = urlsRes.concat(pageUrls);
    console.log('[Sitemap] urlsRes total:', allUrls);
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });

    return builder.buildObject({
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        url: urlsRes,
      },
    });
  }
}
