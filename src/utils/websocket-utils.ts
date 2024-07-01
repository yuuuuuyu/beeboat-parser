export const createWebsocketClient = (state, socketUrl, onmessage) => {
    const keepalive = (socket: any) => {
        state.socketTimeInterval = setInterval(function () {
            if (socket && socket.readyState == 1) {
                console.log('[开始]发送Socket心态包')
                socket.send('{code:0}')
                console.log('[结束]发送Socket心态包')
            }
        }, 10000)
    }
    const conn = () => {
        state.socket = new WebSocket(`ws://${socketUrl.replace(new RegExp('//', 'gm'), '/')}`)
        //接收到消息
        state.socket.onmessage = (msg: any) => {
            onmessage(msg)
        }
        state.socket.onopen = () => {
            keepalive(state.socket)
        }
        state.socket.onclose = () => {
            console.log('连接close')
        }
    }
    conn()
}
