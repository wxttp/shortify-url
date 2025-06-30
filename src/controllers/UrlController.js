import { UrlSchema } from '../models/urlModel.js';

async function createShortUrl(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: 'Request body is missing'
      });
    }

    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        error: 'Original URL is required'
      });
    }

    let shortUrl = "";
    let newUrl;

    if (req.body.shortUrl) {
      shortUrl = req.body.shortUrl;

      const isDuplicateUrl = await UrlSchema.findOne({ shortUrl });

      if (isDuplicateUrl) {
        return res.status(400).json({
          success: false,
          error: 'Short URL already exists'
        });
      }

      shortUrl = shortUrl.toLowerCase().replace(/ /g, '-')

      newUrl = await UrlSchema.create({
        originalUrl,
        shortUrl,
      });

    } else {
      shortUrl = Math.random().toString(36).substring(2, 8);

      newUrl = await UrlSchema.create({
        originalUrl,
        shortUrl,
      });
    }

    return res.status(201).json({
      success: true,
      data: newUrl
    });;
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

async function redirectToOriginalUrl(req, res) {
  try {
    const { shortUrl } = req.params;

    const url = await UrlSchema.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'No URL found'
      });
    }

    return res.status(302).redirect(url.originalUrl);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export { createShortUrl, redirectToOriginalUrl };