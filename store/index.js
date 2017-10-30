import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    jobs: [
      {
        title: 'Developer II, Web Development',
        company: 'Shure Incorporated',
        location: 'Niles, IL',
        timePeriod: {
          from: 'August 2016',
          to: 'Present'
        }
      },
      {
        title: 'Specialist I, Web Marketing',
        company: 'Shure Incorporated',
        location: 'Niles, IL',
        timePeriod: {
          from: 'August 2014',
          to: 'August 2016'
        }
      },
      {
        title: 'Intern, Web Marketing',
        company: 'Shure Incorporated',
        location: 'Niles, IL',
        timePeriod: {
          from: 'May 2014',
          to: 'August 2014'
        }
      },
      {
        title: 'Front-end Developer',
        company: 'CINCS',
        location: 'New York, NY',
        timePeriod: {
          from: 'April 2014',
          to: 'May 2014'
        }
      },
      {
        title: 'Intern, Front-end Developer',
        company: 'Carbon Credit Capital',
        location: 'New York, NY',
        timePeriod: {
          from: 'January 2014',
          to: 'May 2014'
        }
      },
      {
        title: 'Teaching Assistant',
        company: 'State University of New York at Oswego',
        location: 'Oswego, NY',
        timePeriod: {
          from: 'January 2012',
          to: 'May 2012'
        }
      },
      {
        title: 'Sports Photographer',
        company: 'State University of New York at Oswego',
        location: 'Oswego, NY',
        timePeriod: {
          from: 'August 2011',
          to: 'December 2012'
        }
      }
    ],
    projects: [
      {
        category: 'personal',
        github: 'https://github.com/krestaino/nuepress/',
        githubSlug: 'nuepress',
        id: 10,
        imageListLength: 3,
        slug: 'nuepress',
        title: 'NuePress – Personal Project',
        url: 'https://nuepress.kmr.io',
        description: 'This project was to explore <a href="https://nuxtjs.org/" rel="noopener" target="_blank">Nuxt.js</a>. I designed and built the application that communicates with a WordPress install on separate domain name using the <a href="https://developer.wordpress.org/rest-api/" rel="noopener" target="_blank">WordPress REST API</a>.',
        tech: 'Nuxt.js, SCSS'
      },
      {
        category: 'shure',
        id: 9,
        imageListLength: 2,
        slug: 'lincoln',
        title: 'Lincoln – Shure',
        description: 'This application is a clone of <a href="https://ga-dev-tools.appspot.com/campaign-url-builder/" rel="noopener" target="_blank">Google\'s Campaign URL Builder</a> using a custom domain name (shu.re) instead of Google\'s (goo.gl). The back-end is powered by <a href="https://firebase.google.com/" rel="noopener" target="_blank">Firebase</a>, which handles users, authentication, and the database.',
        tech: 'Vue.js, Firebase, SCSS'
      },
      {
        category: 'shure',
        id: 8,
        imageListLength: 20,
        slug: 'axient-digital',
        title: 'Axient® Digital – Shure',
        url: 'http://www.shure.com/americas/axient-digital',
        description: 'Product landing page for a new digital wireless system from Shure. The design and content was provided to me from team members. I was responsible for building out the pages, localizing them, and providing deliverables for our other region\'s websites.',
        tech: 'Nunjucks, SCSS, jQuery, Gulp'
      },
      {
        category: 'personal',
        github: 'https://github.com/krestaino/weather-vue/',
        githubSlug: 'weather-vue',
        id: 7,
        imageListLength: 1,
        slug: 'weather',
        title: 'Weather Vue – Personal Project',
        url: 'https://weather.kmr.io',
        description: 'This project was to explore <a href="https://vuejs.org/" rel="noopener" target="_blank">Vue.js</a> and <a href="https://expressjs.com/" rel="noopener" target="_blank">Express</a>. I designed and built the client application, along with the back-end service that comminucates with Google and <a href="https://darksky.net/dev" rel="noopener" target="_blank">Dark Sky</a> to provide weather and location data.',
        tech: 'Vue.js, SCSS'
      },
      {
        category: 'shure',
        id: 6,
        imageListLength: 18,
        slug: 'motiv',
        title: 'MOTIV™ Recording Microphones – Shure',
        url: 'http://www.shure.com/americas/motiv/recording-musician',
        description: 'Application landing pages to promote a new line of microphones from Shure. The design and content was provided to me from team members. I was responsible for building out the pages, localizing them, and providing deliverables for our other region\'s websites.',
        tech: 'Nunjucks, SCSS, jQuery, Gulp'
      },
      {
        category: 'personal',
        github: 'https://github.com/krestaino/color-con/',
        githubSlug: 'color-con',
        id: 5,
        imageListLength: 1,
        slug: 'color-con',
        title: 'Color Con – Personal Project',
        url: 'https://color-con.kmr.io',
        description: 'I built this application that allows you to create your own Joy-Con color combinations for the Nintendo Switch. URL parameters are updated to allow easy sharing of your creation.',
        tech: 'Nunjucks, SCSS, jQuery, Gulp'
      },
      {
        category: 'shure',
        id: 4,
        imageListLength: 12,
        slug: 'microflex-advance',
        title: 'Microflex® Advance™ Conference Room Audio – Shure',
        url: 'http://www.shure.com/americas/microflex-advance',
        description: 'Product landing page for new corporate AV conferencing microphones from Shure. The design and content was provided to me from team members. I was responsible for building the page.',
        tech: 'HTML, SCSS, jQuery'
      },
      {
        category: 'shure',
        id: 3,
        imageListLength: 12,
        slug: 'ksm8',
        title: 'KSM8 Dualdyne™ Vocal Microphone – Shure',
        url: 'http://www.shure.com/americas/ksm8',
        description: 'Product landing page for a new microphone from Shure. The design and content was provided to me from team members. I was responsible for building the page.',
        tech: 'HTML, SCSS, jQuery'
      },
      {
        category: 'shure',
        id: 2,
        imageListLength: 9,
        slug: 'kse1500',
        title: 'KSE1500 Electrostatic Earphone System – Shure',
        url: 'http://www.shure.com/americas/kse1500',
        description: 'Product landing page for a new portable amp from Shure. The content was provided to me from team members. I was responsible for designing and building the page.',
        tech: 'HTML, SCSS, jQuery'
      },
      {
        category: 'shure',
        id: 1,
        imageListLength: 14,
        slug: 'blog',
        title: 'Blog – Shure',
        url: 'http://blog.shure.com',
        description: 'I designed and built the theme for the Shure Blog. The theme was forked from BlankSlate, a bare-bones WordPress theme with no styles.',
        tech: 'PHP, HTML, CSS, jQuery'
      }
    ]
  }
})

export default store
