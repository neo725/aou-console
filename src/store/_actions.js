import store from './index'
import axios from 'axios'

let combineUrl = (a, b) => {
    //a = a.trimEnd('/')
    a = a.endsWith('/') ? a.substr(0, a.length - 1) : a
    b = b.startsWith('/') ? b : `/${b}`

    return a + b
}


let getActions = () => {
    let _axios = {
        isNothing: true,
        getInstance: () => {
            console.log('You are in _axios.getInstance()')

            if (this['isNothing'] == false && this._instance) return this._instance
    
            console.log('create axios !!!!!!')
            
            let host = store.getters.Config.api_host
            host = host.endsWith('/') ? host.substr(0, host.length - 1) : host
    
            // console.log(host)
    
            this._instance = axios.create({
                baseURL: host,
                timeout: 1000,
                headers: {
                    'X-Custom-Header': 'foobar'
                }
            })
            this.isNothing = false

            return this._instance
        }
    };

    // Add a request interceptor
    axios.interceptors.request.use(function(config) {
        //console.log(store)

        // // Do something before request is sent
        // config.url = combineUrl(store.getters.Config.api_host, config.url)

        // console.log(config.url)

        return config
    }, function(error) {

        // Do something with request error
        return Promise.reject(error)

    })

    return {
        getState({
            state
        }) {
            return state
        },

        addSchedule({
            commit,
            state
        }, args) {
            return new Promise((resolve, reject) => {
                commit('setLoading')

                if (args && args['before']) args.before()

                _axios.getInstance().post('/schedules', args['data'])
                    .then(response => {
                        commit('setSchedules', response.data)

                        if (args && args['done']) {
                            args.done(state.schedules)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
                    .then(() => {
                        commit('clearLoading')
                    })
            })
        },

        getSchedules({
            commit,
            state
        }, args) {
            // console.log('before commit, state :')
            // console.log(this.getState().isLoading)
            commit('setLoading')
            // console.log('after commit, state :')
            // console.log(this.getState().isLoading)
            if (args && args['before']) args.before()

            _axios.getInstance().get(`/schedules`)
                .then(response => { // 取得 jason 內部資料存到 post 陣列裡面
                    commit('clearLoading')

                    commit('setSchedules', response.data)

                    if (args && args['done']) {
                        args.done(state.schedules)
                    }
                })
                .catch(error => { // 錯誤的話傳錯誤訊息
                    commit('clearLoading')

                    console.log(error)
                })
        },

        setLoading({
            commit
        }) {
            commit('setLoading')
        },

        clearLoading({
            commit
        }) {
            commit('clearLoading')
        }
    }
}

export default getActions()