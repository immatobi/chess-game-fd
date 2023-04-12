import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ pageTitle, type }) => {

    const meta = {
        url: 'https://xpresschain.co/',
        title: 'TMP',
        description: 'Work with world top organizations as a top-tier talent',
        language: "en-US",
        image: 'https://storage.googleapis.com/concreap-buckets/xpc-seo.png',
        author: {
            email: `${process.env.REACT_APP_TMA_INFO_EMAIL}`,
            name: 'Xpresschain - Buy, Sell & Swap Cryptocurrencies',
            image:'https://storage.googleapis.com/concreap-buckets/xpc-seo.png'
        },
        site: {
            siteName: 'Xpresschain - Buy, Sell & Swap Cryptocurrencies',
            searchUrl: 'https://www.google.com/search?q=xpresschain'
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"></meta>
                <title>{ type === 'main' ? meta.title + ' - ' + meta.description : !type ? 'Xpresschain' : pageTitle}</title>
                <meta name="description" content={meta.description}></meta>
                <meta name="keywords" content="talent, app"></meta>

                <meta itemprop="description" content={meta.description}></meta>
                <meta itemprop="image" content={meta.image}></meta>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@xpresschain" />
                <meta name="twitter:creator" content="@xpresschain" />
                <meta name="twitter:title" content="Xpresschain - Buy, Sell & Swap Cryptocurrencies"/>
                <meta name="twitter:description" content={meta.description}/>
                <meta name="twitter:image" content={meta.image}/>

                <meta property="og:site_name" content={meta.url} />
                <meta property="og:title" content="Xpresschain - Buy, Sell & Swap Cryptocurrencies"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:image" content={meta.image}/>
                <meta property="og:url" content={meta.url} />
            </Helmet>
        </>
    )
}

export default SEO
