const renderPopup = () => {
  const patternPopup = `
    <!-- ======== -->
    <div class="popup_wrap">
    
    <div class="popup">
        <div class="popup_title ">ФАЙЛЫ</div>
        <div class="popup_wrap_close">Закрыть</div>
        
        <div class="popup_file_wrap   "></div>
      </div>
    </div>
    <!-- ======== -->
    `;
  document.querySelector("body").insertAdjacentHTML(`beforeend`, patternPopup);
};
renderPopup();

document.querySelector(".popup_wrap_close").onclick = () => {
  document.querySelector(".popup_wrap").classList.toggle("popup_wrap_flex");
};

document.querySelector(".offcanvas-body").onclick = (event) => {
  const oauthToken = "y0_AgAAAAA0GegxAADLWwAAAADbTcSzMQxDUAfBShG0AjfY7BAEsEzda7A";
  const limit = 1000;

  console.log(event.target.getAttribute("data-path"));

  if (event.target.getAttribute("data-path")) {
    let path = event.target.getAttribute("data-path");
    // let path = "disk%3A%2FAll%2FКлассный%20Руководитель"
    console.log(path);

    const openFolder = async () => {
      const response = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(path)}&limit=${limit}`,
        {
          headers: { Accept: "application/json", Authorization: `OAuth ${oauthToken}` },
        }
      );

      const dataFul = await response.json();
      const data = dataFul._embedded.items;
      console.log(data);
      renderFilePopup(data);
    };
    openFolder();

    const renderFilePopup = (data) => {
      if (document.querySelector(".popup_wrap").classList == "popup_wrap") {
        document.querySelector(".popup_wrap").classList.add("popup_wrap_flex");
      }

      const popupFileWrap = document.querySelector(".popup_file_wrap");
      console.log(popupFileWrap);
      popupFileWrap.innerHTML = "";

      data.forEach((element) => {
        if (element.type === "file") {
          patternFileCard = `
                            <div class="card_file">
                                <img src="${element.preview}" alt="">
                                <div class="m-3">${element.name}</div>
                                <a href="${element.file}">Загрузить</a>
                            </div>
                        `;
          popupFileWrap.insertAdjacentHTML("beforeend", patternFileCard);
        } else if (element.type === "dir") {
          patternFileCard = `
                            <div class="card_file">
                                <img src="../images/icon/folder.svg" alt="">
                                <div class="m-3">${element.name}</div>
                                <div class='asd'data-path="${element.path}">Открыть</div>
            
                            </div>
                        `;
          popupFileWrap.insertAdjacentHTML("beforeend", patternFileCard);
        } else {
          patternFileCard = `
                            <div class="card_file">
                                <img src="../images/icon/zip.svg" alt="">
                                <div>${element.name}</div>
                                <a href="${element.file}">Загрузить</a>
                            </div>
                    `;
          popupFileWrap.insertAdjacentHTML("beforeend", patternFileCard);
        }
      });
    };
  }
};
