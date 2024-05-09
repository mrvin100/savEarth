const showHiddenPassword = (passField, passEye) =>{
	const input = document.querySelector(passField),
		  iconEye = document.querySelector(passEye)

	if(input && iconEye){
		iconEye.addEventListener('click', () =>{
			// Change password to text
			if(input.type === 'password'){
				//Switch to text
				input.type = 'text'
				// Icon change
				iconEye.classList.add('fa-eye')
				iconEye.classList.remove('fa-eye-slash')
			}else{
				// Change to password
				input.type = 'password'
				
				//Icon change
				iconEye.classList.remove('fa-eye')
				iconEye.classList.add('fa-eye-slash')
			}
		})
	}
}


showHiddenPassword('.pass', '.eye')
showHiddenPassword('.cpass', '.eye')

// const changeClassList

const loginForm = document.querySelector('.login')
const loginDatas = {}

const loginInputs = document.querySelectorAll('.login input')

if (loginForm){
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault()
		loginInputs.forEach(input => {
			const name = input.name
			name === 'email' || 'password' ? loginDatas[name] = input.value : null
	
		});
	
		fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			  },
			body: JSON.stringify(loginDatas),
			
		}).then(res => res.json())
		.then(data => window.location.href = "index.html")
		.catch(error => console.error(error))
			
	})
}


