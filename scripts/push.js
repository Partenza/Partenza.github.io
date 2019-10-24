'use strict'

const execa = require('execa')
const ghPages = require('gh-pages')

;(async function run() {
    try {
        const ret = await execa.shell('git rev-parse --abbrev-ref HEAD')

        // if (ret.stdout !== 'master') {
        //     return console.log(`${ret.stdout} 非 master 分支，忽略 Gitbook 编译及更新`)
        // }

        console.log('开始编译 gitbook')
        await execa('gitbook', ['build', '--log', 'debug'], {
            stdio: 'inherit'
        })
        console.log('编译成功！')

        console.log('开始发布 pages')
        await ghPages.publish('_book', {
            branch: 'pages'
        })
        console.log('发布成功！')
    } catch (err) {
        console.log('发布失败', err.stack)
    }
})()