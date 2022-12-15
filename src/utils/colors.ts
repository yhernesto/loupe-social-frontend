export function hexToRgbA(hex: string, opacity: number): string{
    let c: string|number
    let arrC: string[]
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        arrC= hex.substring(1).split('')
        if(arrC.length== 3){
            arrC= [arrC[0], arrC[0], arrC[1], arrC[1], arrC[2], arrC[2]]
        }
        c = '0x' + arrC.join('')
        c = Number(c)
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ opacity +')'
    }
    throw new Error('Bad Hex')
}


//Defining scale of colors  
//Defining scale of colors 
const scoreScale = [
    { pct: 0.1, color: 'red' },
    { pct: 0.2, color: 'deep-orange-14' },  
    { pct: 0.3, color: 'orange-14' }, 
    { pct: 0.4, color: 'amber-8' }, 
    { pct: 0.5, color: 'amber-5' },
    { pct: 0.6, color: 'yellow-5' }, 
    { pct: 0.7, color: 'lime-5' },
    { pct: 0.8, color: 'light-green-5' },
    { pct: 0.9, color: 'green-4' },
    { pct: 1.0, color: 'green' }
]

const magnitudePositiveScale = [
    { pct: 0.2, color: 'yellow-5' }, 
    { pct: 0.4, color: 'lime-5' },
    { pct: 0.6, color: 'light-green-5' },
    { pct: 0.8, color: 'green-4' },
    { pct: 1.0, color: 'green' }
]

const magnitudeNegativeScale = [
    { pct: 0.2, color: 'yellow-5' },
    { pct: 0.4, color: 'amber-8' }, 
    { pct: 0.6, color: 'orange-14' }, 
    { pct: 0.8, color: 'deep-orange-14' },
    { pct: 1.0, color: 'red' }
]

export function getScoreColorByPct(pct: number): string{ 
    if(pct !== null && pct != undefined){
        const color = scoreScale.filter(color => color.pct >= pct )
        return color[0].color
    }
    return ''
}

export function getMagnitudeColorByPct(scorePct: number, magnitudePct: number): string{ 
    if((scorePct !== null || scorePct != undefined && magnitudePct) && (magnitudePct !== null || magnitudePct != undefined)){
        if(scorePct >= 0){
            const color = magnitudePositiveScale.filter(color => color.pct >= magnitudePct )
            return color[0].color
        }else{
            const color = magnitudeNegativeScale.filter(color => color.pct >= magnitudePct )
            return color[0].color
        }
    }
    return ''
}