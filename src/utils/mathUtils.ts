export function roundDecimal(number: number, decimals: number): number | null{
  if((number != null && number != undefined) && (decimals != null && decimals != undefined)){
    const _decimals = Math.pow(10, decimals)
    const roundedDecimal = Math.round((number + Number.EPSILON) * _decimals) / _decimals
    return roundedDecimal
  }
  return null
}

export function percentageDifference(params : {prev: number, current: number}): number {
  const {prev, current} = params
  if(prev > 0){
    if(current){
      const diff = ((current-prev)/prev)*100
      if(diff){ return roundDecimal(diff, 2) || 0 }
    }else{
      return -100
    }
  }else{
    if(current){ return 100 }
  }
  return 0
}