module.exports = ($) => {
    // Init
    let obj = {}
    obj.meta = {};
    obj.meta.og = {};
    obj.meta.author = {};

    const author = $('.blogdetail__authorpanel__title').html();

    if (author) {
        const a = $('.blogdetail__authorpanel__title').html().split('<span>');
        obj.meta.author.name = a[0].trim();
        obj.meta.author.title = `<span>${a[1]}`.trim();
    }

    $('.blogdetail__related-articles').remove();
    $('.blogdetail__authorpanel blogdetail__authorpanel--desktop').remove();
    $('.blogdetail__share').remove();

    // Featured Image
    obj.featured_image = $('.visuallyhidden').attr('src');

    // Meta
    obj.meta.title_tag = $('title').text();
    obj.meta.description = $('meta[name=description]').attr('content');
    obj.meta.keywords = $('meta[name=keywords]').attr('content');
    obj.meta.og.site_name = $('meta[property="og:site_name"]').attr('content');

    // OG
    obj.meta.og.url = $('meta[property="og:url"]').attr('content');
    obj.meta.og.type = $('meta[property="og:type"]').attr('content');
    obj.meta.og.title = $('meta[property="og:title"]').attr('content');
    obj.meta.og.image = $('meta[property="og:image"]').attr('content');
    obj.meta.og.description = $('meta[property="og:description"]').attr('content');
    obj.title = $('h3', '.inner-page__grayheader').html();

    console.log('***********************************************');
    console.log($('h3', '.inner-page__grayheader').html());
    console.log('***********************************************');

    // Get date and principle
    let datePrinciple = $('p', '.inner-page__grayheader').html();
    if (datePrinciple) {
        obj.date = datePrinciple.split('<span>/</span>')[0].trim();
        obj.principle = datePrinciple.split('<span>/</span>')[1] ?
            datePrinciple.split('<span>/</span>')[1].trim() :
            null;
    }

    // Body
    obj.content_body = ''
    $('.inner-page__white').children('p').each(function(i, elem) {
        obj.content_body += $(elem).html();
    });

    return obj;
}