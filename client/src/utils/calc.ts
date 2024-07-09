/*

    -Fetch top tracks
    -use foreach to get duration_ms property
    -convert miliseconds to minutes
        formula 
            -> duration_ms / 60000
    -round to nearest integer
    -return result

 */
interface durations {
  lessThan4: number;
  greaterThan4: number;
}

export function calculateLength(
  duration: number,
  durationsObj: durations
): durations {
  const res = Math.floor(duration / 60000);
  if (res < 4) {
    durationsObj.lessThan4 += 1;
  } else {
    durationsObj.greaterThan4 += 1;
  }
  return durationsObj;
}
