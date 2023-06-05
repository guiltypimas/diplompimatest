const oauthToken = "y0_AgAAAAA0GegxAADLWwAAAADbTcSzMQxDUAfBShG0AjfY7BAEsEzda7A";
const limit = 1000;

// // ====> КНОПКА НАЗАД <====
// const backBTN = (path) => {
//   if (path == null) {
//     let path = "/";
//   }
//   let pat = `<div class="back_path" data-back="${path}">=== back ===</div>`;
//   console.log("not");
//   document.querySelector(".back").innerHTML = pat;
// };

// document.querySelector(".back_path").onclick = (event) => {
//   // path = event.target.getAttribute("data-backPath")
//   console.log(event.target.getAttribute("data-back"));
//   openFolder(path);
//   if (path != "/") {
//     path = path.split("/");
//     path = path.splice(0, path.length - 1).join("/");
//   }
//   backBTN(path);
//   // console.log(event.target.getAttribute("data-backPath"))
// };

// =============> ОТКРЫТЬ ПАПКУ <================
const openFolder = async () => {
  // console.log(path)
  const response = await fetch(`https://cloud-api.yandex.net/v1/disk/resources?path=sixclass&limit=${limit}`, {
    headers: { Authorization: `OAuth ${oauthToken}` },
  });
  const dataFul = await response.json();
  const data = dataFul._embedded.items;
  createCard(data);
  console.log(data);
};

openFolder((path = "/"));

// =============> РЕНДЕР ФАЙЛОВ <================
const createCard = (data) => {
  const fileWrap = document.querySelector(".file_wrap");
  fileWrap.innerHTML = "";

  data.forEach((element) => {
    let patternFileCard = ``;

    if (element.type === "file") {
      patternFileCard = `
                <div class="card_file">
                    <img src="${element.preview}" alt="">
                    <div>${element.name}</div>
                    <a href="${element.file}">Загрузить</a>
                </div>
            `;
    } else if (element.type === "dir") {
      patternFileCard = `
                <div class="card_file">
                    <img src="./images/folder.svg" alt="">
                    <div>${element.name}</div>
                    <div class='asd'data-path="${element.path}">Открыть</div>

                </div>
            `;
    } else {
      patternFileCard = `
                <div class="card_file">
                    <img src="/images/zip.svg" alt="">
                    <div>${element.name}</div>
                    <a href="${element.file}">Загрузить</a>
                </div>
        `;
    }
    fileWrap.insertAdjacentHTML("afterbegin", patternFileCard);
  });
};

document.querySelector(".file_wrap").onclick = (event) => {
  // console.log(event.target.getAttribute("data-path"))
  if (event.target.getAttribute("data-path")) {
    path = event.target.getAttribute("data-path");
    openFolder(path);
  }
};

// ${element.path}
