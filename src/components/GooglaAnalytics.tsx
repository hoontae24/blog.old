import config from "../../_data/config.json"

const GA = () => {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${config.google_analytics}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.google_analytics}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <meta
        name="google-site-verification"
        content="sZMzCJPtPjYrQ1vng3IoeUVnaOFrys1PeZbmvtt4QdM"
      />
    </>
  )
}

export default GA
