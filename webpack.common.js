const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')
const modulesData = require('./src/data/modules.json')

// Генерируем entry points для всех уроков
const lessonsEntries = {}
modulesData.modules.forEach((module) => {
  module.lessons.forEach((lesson) => {
    const entryName = `${module.slug}-${lesson.slug}`
    lessonsEntries[entryName] = './src/lesson.jsx'
  })
})

module.exports = {
  entry: {
    index: './src/index.js',
    article: './src/article.jsx',
    tutorials: './src/tutorials.jsx',
    landing: './src/landing.js',
    'module-1': './src/module-1.jsx',
    'module-2': './src/module-2.jsx',
    'module-3': './src/module-3.jsx',
    'module-4': './src/module-4.jsx',
    404: './src/404.js',
    ...lessonsEntries
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/'
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            urlFilter: (attribute, value) => {
              // Don't process favicon links
              if (value.includes('favicon.ico')) {
                return false
              }
              return true
            }
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.ico$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/icons/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),

    // Copy static assets (icons and OG images without hashing)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/images/icons',
          to: 'images/icons',
          noErrorOnMissing: true
        },
        {
          from: 'src/images/og',
          to: 'images/og',
          noErrorOnMissing: true
        }
      ]
    }),

    // Landing page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),

    // Internal pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/page.html',
      filename: './pages/page.html',
      chunks: ['page']
    }),

    // Article page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/article.html',
      filename: './pages/article.html',
      chunks: ['article']
    }),

    // Tutorials page (all modules)
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/tutorials/index.html',
      filename: './tutorials/index.html',
      chunks: ['tutorials']
    }),

    // Module 1 page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/tutorials/module-1.html',
      filename: './tutorials/module-1/index.html',
      chunks: ['module-1']
    }),

    // Module 2 page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/tutorials/module-2.html',
      filename: './tutorials/module-2/index.html',
      chunks: ['module-2']
    }),

    // Module 3 page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/tutorials/module-3.html',
      filename: './tutorials/module-3/index.html',
      chunks: ['module-3']
    }),

    // Module 4 page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/tutorials/module-4.html',
      filename: './tutorials/module-4/index.html',
      chunks: ['module-4']
    }),

    // Landing page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/landing.html',
      filename: './landing.html',
      chunks: ['landing']
    }),

    // About page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/about.html',
      filename: './about.html',
      chunks: ['index']
    }),

    // 404 page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/404.html',
      filename: './404.html',
      chunks: ['404']
    }),

    // Динамическая генерация страниц уроков с SEO метаданными
    ...modulesData.modules.flatMap((module) =>
      module.lessons.map((lesson) => {
        const entryName = `${module.slug}-${lesson.slug}`
        const lessonData = require(`./src/data/lessons/${lesson.slug}.json`)

        return new HtmlWebpackPlugin({
          hash: true,
          scriptLoading: 'blocking',
          template: './src/pages/lesson-template.html',
          filename: `./tutorials/${module.slug}/${lesson.slug}.html`,
          chunks: [entryName],
          title: `${lessonData.title} - ${module.title} - ADivC`,
          meta: {
            description: lessonData.description,
            keywords: lessonData.keywords.join(', '),
            'og:title': `${lessonData.title} - ${module.title} - ADivC`,
            'og:description': lessonData.description,
            'og:type': 'article'
          }
        })
      })
    ),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      },
      {
        path: path.join(__dirname, './src/partials/navbar.html'),
        location: 'navbar',
        template_filename: '*',
        priority: 'replace'
      },
      {
        path: path.join(__dirname, './src/partials/footer.html'),
        location: 'footer',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  }
}
