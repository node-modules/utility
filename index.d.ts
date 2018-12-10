export = utility;
export as namespace utility;

declare namespace utility {

  // ** Defines For Array **

  /**
   * Array random slice with items count.
   * @param {Array} arr
   * @param {Number} num, number of sub items.
   * @return {Array}
   */
  function randomSlice(arr: any[], num?: number): any[];

  /**
   * Remove one exists element from an array
   * @param {Array} arr
   * @param  {Number} index - remove element index
   * @return {Array} the array instance
   */
  function spliceOne(arr: any[], index: number): any[];

}