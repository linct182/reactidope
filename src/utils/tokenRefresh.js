import api from './api';
import { ACCESS_TOKEN, EXPIRES_IN } from '../constants/localStorage';

let value = 0;

const Runner = (iDuration) => {

    setTimeout(() => {
        // 
        if (value === 1 && window.localStorage.getItem(ACCESS_TOKEN)) {
            return api({
                method: 'GET',
                url: '/refresh',
                headers: {
                    Authorization: window.localStorage.getItem(ACCESS_TOKEN)
                }
            }).then((out) => {
                let { data } = out;
                window.localStorage.setItem(ACCESS_TOKEN, data.key);
                window.localStorage.setItem(EXPIRES_IN, Date.parse(new Date()) + data.offset);
                return Runner(data.offset);
            }).catch(() => {
                // stop the runner
                value = 0;
            })
        }
    }, iDuration);
}

window.runner = {
    start: (iDuration) => {
        value = 1;
        Runner(iDuration);
    },
    stop: () => {
        value = 0;
    }
}

let initialDuration = parseInt(window.localStorage.getItem(EXPIRES_IN), 10) || 0;

if (initialDuration > 0) {
    // initialduration 
    initialDuration = initialDuration - Date.parse(new Date());

}
// reset initialDuration to zero if it is less than normal
if (initialDuration < 0) {
    initialDuration = 0;
}

console.log('Token will refresh in', initialDuration/1000, 'seconds');
window.runner.start(initialDuration);