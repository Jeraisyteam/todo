function insertLoginBox() {
  const html = `
    <div id="loginModal" class="modal" style="display:none;">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" onclick="closeModal('loginModal')">&times;</span>
        <h2 class="box-head">بدء تسجيل الدخول او التسجيل لحجز الخدمة</h2>
        <div class="label-input">
          <label for="phone" class="label-phone">رقم الهاتف</label>
          <div class="phone-input-container">
            <select class="flag-dropdown" id="country-flag-dropdown" onchange="updateCountryCode()">
              <option value="+1" data-country-code="US">🇺🇸</option>
              <option value="+91" data-country-code="IN">🇮🇳</option>
              <option value="+966" data-country-code="SA" selected>SA</option>
            </select>
            <div class="vertical-line"></div>
            <span class="country-code" id="dial-code">+966</span>
            <input type="text" class="editable-part" id="editable-part" maxlength="9">
          </div>
        </div>
        <button type="submit" class="btn blue" onclick="startLoginProcess()">تسجيل الدخول</button>
        <button type="button" class="btn orange" onclick="closeModal('loginModal')">تسجيل الدخول كزائر</button>
        <p class="problem-text">نواجه مشكلة في تسجيل الدخول؟ <span class="problem-contact">اتصل بنا</span></p>
      </div>
    </div>
    
    <!-- SMS Verification Box -->
    <div id="smsVerificationModal" class="modal" style="display:none;">
      <div class="new-modal-content">
        <span class="close" onclick="closeModal('smsVerificationModal')">&times;</span>
        <h2 class="new-box-head">رمز التحقيق</h2>
        <p class="new-problem-text">الرجاء ادخال الرمز المرسل على الرقم</p>
        <div class="new-verification-container">
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
        </div>
        <button type="submit" class="new-btn new-blue" onclick="sendOtp()">تاكيد</button>
        <div class="new-one-line-p">
          <p class="new-problem-text">لم يصلك الكود. <span class="new-problem-contact">اعد ارسال الكود</span></p>
          <span class="new-problem-contact">تعديل رقم الجوال</span>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  setupEventListeners();
}

function setupEventListeners() {
  document.querySelectorAll('.new-verification-box').forEach((input, idx, inputs) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && idx < inputs.length - 1) {
            inputs[idx + 1].focus();
        }
    });
  });

  const loginButton = document.getElementById('openLoginModal');
  if (loginButton) {
    loginButton.onclick = () => showModal('loginModal');
  }
}

function checkLoginState() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
      updateLoginUI();
      document.getElementById('openLoginModal') && (document.getElementById('openLoginModal').style.display = 'none');
  } else {
      document.getElementById('openLoginModal') && (document.getElementById('openLoginModal').style.display = 'block');
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function showModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function startLoginProcess() {
  var phoneNumber = document.getElementById("editable-part").value.trim();
  var fullPhoneNumber = document.getElementById('dial-code').textContent + phoneNumber;
  document.querySelector('.new-problem-text').textContent = `الرجاء ادخال الرمز المرسل على الرقم ${fullPhoneNumber}`;
  login(fullPhoneNumber);
}

function login(phoneNumber) {
  const myHeaders = new Headers();
  myHeaders.append("Appname", "najdah");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "login": phoneNumber.replace('+', '') });
  const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };

  fetch("https://test.najdah.app/jer/api/v1/client/easy/login", requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result && result.result && result.result.success) {
            localStorage.setItem('loginData', JSON.stringify(result.result.data));
            // Log and alert the OTP code
            const otpCode = result.result.data.verification_code;
            console.log("Your OTP Code is: " + otpCode); // Logging the OTP to the console
            alert("Your OTP Code is: " + otpCode); // Alerting the OTP to the user
            // Show the SMS verification modal if you still need to ask for OTP input
            showModal('smsVerificationModal');
        } else {
            alert("Login failed: " + (result.result.message || "Unknown error"));
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('Login error: ' + error.message);
    });
}


function sendOtp() {
  const otpInputs = document.querySelectorAll('.new-verification-box');
  const otpCode = Array.from(otpInputs).reduce((code, input) => code + input.value.trim(), '');
  const loginData = JSON.parse(localStorage.getItem('loginData'));

  if (otpCode === loginData.verification_code) {
      if (loginData.type === 'login') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userName', loginData.name);
          window.location.reload();
      } else if (loginData.type === 'signup') {
          window.location.href = 'signup.html';
      }
  } else {
      alert("Incorrect OTP entered. Please try again.");
  }
}

function updateLoginUI() {
  // Only proceed if the user is logged in and the user icon does not already exist
  if (localStorage.getItem('isLoggedIn') === 'true' && !document.getElementById('userIcon')) {
    let elementsF = document.querySelectorAll(".nav-cont-2");

    if (elementsF.length > 0) {
      elementsF.forEach(element => {
        const userIcon = document.createElement('a');
        userIcon.id = 'userIcon';
        userIcon.textContent = ' 👤  ' + localStorage.getItem('userName');  // Use stored user name
        userIcon.style.borderRadius = '50%';
        userIcon.style.display = 'inline-block';  // Ensure it displays inline

        // Optionally, add attributes like href if it's supposed to be a link
        userIcon.href = '#userProfile';  // Example link, possibly to a user profile

        // Insert the user icon at the beginning of the element
        element.insertBefore(userIcon, element.firstChild);
      });
    } else {
      console.error("No elements with class '.nav-cont-2' found.");
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  insertLoginBox();
  checkLoginState();
});
