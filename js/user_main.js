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