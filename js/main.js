(() =>{
    const $ = document.querySelector.bind(document);
    let timer = 7000;
    let isRotating = false;
    let currentRotate = 0;
    const wheel = $('.wheel');
    const btnStart = $('.btn-start');
    const msg = $('.msg');
    const listGift = [
        
        {
            txtN:'10k vnd',
            percent: 10/100
        },
        {
            txtN:'20k vnd',
            percent: 20/100
        },
        {
            txtN:'50k vnd',
            percent: 15/100
        },
        {
            txtN:'100k vnd',
            percent: 15/100
        },
        {
            txtN:'200k vnd',
            percent: 20/100
        },
        {
            txtN:'500k vnd',
            percent: 10/100
        },
    ];
    const size = listGift.length;
    const rotate = 360 / size;
    const skewY = 90 - rotate;

    const renderItem = () => {
        listGift.map((item,index) =>{
            const itemGift = document.createElement('li');

            itemGift.style.transform = `
                rotate(${rotate*index}deg)
                skewY(-${skewY}deg)
            `;
            itemGift.innerHTML=`
                <p class="text-item ${index%2==0&&'even'}"
                style="transform: skewY(${skewY}deg)
                rotate(${rotate / 2}deg)"
                >
                    <b>${item.txtN}</b>
                </p>
            `;    
            wheel.appendChild(itemGift );
        });
    };
    const rotateWheel = (currentRotate, index) => {
        wheel.style.transform=`rotate(${
            currentRotate-index*rotate-rotate/2
        }deg)`;
    };
    const getGift = (randomNumber) => {
        let currentPercent = 0;
        let list =[];
        listGift.forEach((item,index)=>{
            currentPercent+=item.percent;
            randomNumber <= currentPercent && 
                list.push({
                    ...item,
                    index,
                });
        });
        return list[0];
    };
    const showTxtGift = (txt) => {
        setTimeout(() =>{
            isRotating=false;
            Swal.fire({
                width: 600,
                
                confirmButtonText: "huhu",
                
                title: "Chúc Bạn May Mắn Lần Sau <3",
                text: 'Em đã quay vào phần quà lì xì trị giá 10k vnd',
                confirmButtonColor: "#83d0c9",
                onClose: () => {
                window.location = "https://maitrungdung08042002.github.io/template/wheelaa.html"; 
                },
            });
            console.log(txt);
        },timer);
        
    };
    const start = () => {
        isRotating=true;
        const random = Math.random();
        const gift = getGift(random);

        currentRotate+=360*10;
        rotateWheel(currentRotate,gift.index);
        showTxtGift(gift.txtN);

    };
    btnStart.addEventListener('click', ()=> {
        !isRotating&&start();
    });
    renderItem();
})();