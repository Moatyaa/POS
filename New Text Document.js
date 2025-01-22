const btn = document.getElementById('get_btn')
const getData = async ()=>{
    try {
        const response = await fetch('http://192.168.137.1:9090/Category' , {"hamo":"123456"},{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIzZmZjNjc0OS0wZTgyLTQxZTUtYTI0NS0xOTBmZTg3MDRlNDkiLCJzdWIiOiJBdGlhIiwiaWF0IjoxNzM2Nzc4MDQ1LCJpc3MiOiJhcHAtU2VydmljZSIsImV4cCI6MTczNjc3OTg0NSwiY3JlYXRlZCI6MTczNjc3ODA0NTk0OX0.8LVMCF6MnvjkvhtKYJd95ejMq7YEaS68ER7bsZN2zm9YTNYsP47XVk7d5ife6Gvc_o-65xded7yiIKguyp7RQg',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

btn.addEventListener('click',()=>{
    getData().then(data=>{
        if(data){
            console.log(data)
        }else{
            console.log('Failed to fetch data')
        }
    })
})

