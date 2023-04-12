import { useEffect} from 'react'
import loader from './loader'

export function useNetworkDetect(){

    
    const toggleNetwork = (e) => {
        loader.popNetwork()
    }

    useEffect(() => {

        window.addEventListener(`offline`, toggleNetwork, false);
        window.addEventListener(`online`, () => { }, false);

    }, [])

}