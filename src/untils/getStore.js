export const getUserMsg = () => {
  let temp = JSON.parse(sessionStorage.getItem('token'));
  return temp;
}
export const getCookie = (key) => {
  //获取cookie
  const data = document.cookie

  //获取key第一次出现的位置
  let startIndex = data.indexOf(key + '=')

  //如果开始索引值大于0表示有cookie
  if (startIndex > -1) {
    //key的起始位置等于出现的位置加key的长度+1
    startIndex = startIndex + key.length + 1
    //结束位置等于从key开始的位置之后第一次;号所出现的位置
    let endIndex = data.indexOf(';', startIndex)
    //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
    endIndex = endIndex < 0 ? data.length : endIndex
    return decodeURIComponent(data.substring(startIndex, endIndex))
  } else {
    return ''
  }
}
export const setCookie = (key, value) => {
  const d = new Date();
  d.setTime(d.getTime() + (30 * 60 * 1000));
  const expires = "expires=" + d.toGMTString();
  document.cookie = key + "=" + escape(value) + "; " + expires;
}
// export default {
//     getUserMsg,
//     getCookie
// };
// export default getUserMsg;
// export default getCookie;