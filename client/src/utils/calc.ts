/*

    -Fetch top tracks
    -use foreach to get duration_ms property
    -convert miliseconds to minutes
        formula 
            -> duration_ms / 60000
    -round to nearest integer
    -return result

 */
export function calculateLength(duration: number): number {
  return Math.floor(duration / 60000);
}
