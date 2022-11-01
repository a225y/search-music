import "./styles.css";
import { isEmpty, showAlert} from './validation.js'

//import * as bootstrap from 'bootstrap';
import bootstrap from 'bootstrap'; 

console.log("hello world!");





//搜索資訊
const fetchJsonp = require('fetch-jsonp');

let search = document.querySelector('input');
let thead = document.querySelector('thead');
search.addEventListener('keyup',fetchMusic)
function fetchMusic(e){
    if(e.keyCode === 13){
        const keyWord = search.value;

        //若未輸入彈出提示框
        if(isEmpty(keyWord)){
            showAlert();
            return;
        }

        const fetchUrl = `https://itunes.apple.com/search?term=${keyWord}&limit=25`

        fetchJsonp(fetchUrl)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
           showMusic(data.results)
        })
        .catch(function (err) { alert('資料庫尚未搜尋到此歌曲')})

        //清空input前次搜索
        search.value = '';
        //控制thead顯示
        thead.style.opacity = 1;
    }
    
}

const musicInfo = document.querySelector('tbody');

function showMusic(musics){
    // 清除前次搜索
    musicInfo.innerHTML = '';
    
    for(var i=0;i<musics.length;i++){
        const info = musics[i]

        //跳過不是song的搜索內容
        if (info.kind !== 'song'){
            continue;
        }
        console.log(info);

        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <th scope="row">
                <span class="album">
                    <img src="${info.artworkUrl100}">
                </span>
            </th>
            <td  style="padding-left: 10px"> ${info.trackName} </td>
            <td> ${info.artistName}</td>
            <td> ${info.collectionName}</td>
            <td style=" text-align: center"><audio src="${info.previewUrl}"controls></audio></td>
            <td><p><a href="${info.collectionViewUrl}" target="blank">完整版</a></p></td>
        `;
        
        musicInfo.appendChild(tr);
    }
        // ${info.artistName} 歌手
        // ${info.trackName}  關鍵字
        // ${info.artworkUrl100} 照片
        // ${info.collectionName} 專輯
        // ${info.releaseDate.split('-', 1)} 年份
        // ${info.previewUrl} 試聽
        // ${info.collectionViewUrl} 完整曲目
}
//popup登入框彈出
// const loginBtn = document.querySelector('.login-btn');
// const closeBtn = document.querySelector('.btn-close');
// const popup = document.querySelector('.popup');
// loginBtn.addEventListener('click',function(){
//     popup.style.display='block';
// });
// closeBtn.addEventListener('click', function () {
//     popup.style.display = 'none';
// });

