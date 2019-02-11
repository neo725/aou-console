// 要使用 ~ 來代表專案根目錄
// https://www.npmjs.com/package/babel-plugin-root-import
import Config from '~/config'

let _config = Config['default'] || Config || {}

const config = {
    'api_host': _config['api-service'].host
}

export default config