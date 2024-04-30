function insertLoginBox() {
  const html = `
    <div id="loginModal" class="modal" style="display:none;">
      <div class="modal-content">
        <span class="close" onclick="closeModal('loginModal')">&times;</span>
        <h2 class="box-head">ابدأ تسجيل الدخول أو التسجيل لحجز الخدمة</h2>
        <div class="label-input">
          <label for="phone" class="label-phone">رقم الهاتف</label>
          <div class="phone-input-container">
            <select class="flag-dropdown" id="country-flag-dropdown" onchange="updateCountryCode()">
              <option value="+1" data-country-code="US">🇺🇸</option>
              <option value="+91" data-country-code="IN">🇮🇳</option>
              <option value="+966" data-country-code="SA" selected>🇸🇦</option>
            </select>
            <div class="vertical-line"></div>
            <span class="country-code" id="dial-code">+966</span>
            <input type="text" class="editable-part" id="editable-part" maxlength="9" oninput="validatePhoneNumber(this)">
          </div>
        </div>
        <button type="submit" class="btn blue" onclick="startLoginProcess()">تسجيل الدخول</button>
        <button type="button" class="btn orange" onclick="closeModal('loginModal')">تسجيل الدخول كزائر</button>
        <p class="problem-text">هل تواجه مشكلة في تسجيل الدخول؟ <span class="problem-contact">اتصل بنا</span></p>
      </div>
    </div>
    <div id="smsVerificationModal" class="modal" style="display:none;">
      <div class="new-modal-content">
        <span class="close" onclick="closeModal('smsVerificationModal')">&times;</span>
        <h2 class="new-box-head">كود التحقق</h2>
        <p class="new-problem-text">الرجاء إدخال الرمز المرسل إلى رقمك</p>
        <div class="new-verification-container">
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
          <input type="text" maxlength="1" pattern="[0-9]*" inputmode="numeric" class="new-verification-box" />
        </div>
        <button type="submit" class="new-btn new-blue" onclick="sendOtp()">تأكيد</button>
        <div class="new-one-line-p">
          <p class="new-problem-text"><span class="new-problem-contact">إعادة إرسال الكود</span></p>
          <span class="new-problem-contact">تعديل رقم الهاتف</span>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  setupEventListeners();
}

function validatePhoneNumber(input) {
  const pattern = /^[5][0-9]{8}$/;
  if (!pattern.test(input.value) && input.value.length === 9) {
    alert('يجب أن يبدأ الرقم بـ 5 وأن يكون طوله 9 أرقام.');
    input.value = ''; // إعادة تعيين الإدخال
  }
}

function moveToNextInput(event, input) {
  let value = input.value;
  let next = input.nextElementSibling;

  if (event.key === 'Backspace' && value === '') {
    let previous = input.previousElementSibling;
    if (previous && previous.classList.contains('new-verification-box')) {
      previous.focus();
    }
  } else if (value.length === 1 && next && next.classList.contains('new-verification-box')) {
    next.focus();
  }
}

function setupEventListeners() {
  document.querySelectorAll('.new-verification-box').forEach(input => {
    input.addEventListener('keyup', event => moveToNextInput(event, input));
  });

  const loginButton = document.getElementById('openLoginModal');
  if (loginButton) {
    loginButton.onclick = () => showModal('loginModal');
  }
}

function checkLoginState() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    updateLoginUI();
    if (document.getElementById('openLoginModal')) {
      document.getElementById('openLoginModal').style.display = 'none';
    }
  } else {
    if (document.getElementById('openLoginModal')) {
      document.getElementById('openLoginModal').style.display = 'block';
    }
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function showModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function startLoginProcess() {



  var countryCode = '+966';
var phoneNumber = '548981892';
var fullPhoneNumber = countryCode + phoneNumber;
console.log(fullPhoneNumber);
  if (!/^[+][0-9]{12}$/.test(fullPhoneNumber)) {
    alert('الرقم المدخل غير صحيح. يرجى التأكد من إدخال رقم دولي صحيح.');
    return;
  }

  document.querySelector('.new-problem-text').textContent = `الرجاء إدخال الرمز المرسل إلى ${fullPhoneNumber}`;

  const sendButton = document.querySelector('.new-btn.new-blue');
  sendButton.disabled = true; // Disable the button
  setTimeout(() => {
    sendButton.disabled = false; // Enable the button after 5 seconds
  }, 5000);

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
            const otpCode = result.result.data.verification_code;
            console.log("رمز OTP الخاص بك هو: " + otpCode);
            alert("رمز OTP الخاص بك هو: " + otpCode);
            showModal('smsVerificationModal');
        } else {
            alert("فشل في تسجيل الدخول: " + (result.result.message || "خطأ غير معروف"));
        }
    })
    .catch(error => {
        console.error('خطأ أثناء تسجيل الدخول:', error);
        alert('خطأ في تسجيل الدخول: ' + error.message);
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
      alert("تم إدخال OTP غير صحيح. الرجاء المحاولة مرة أخرى.");
  }
}

function updateLoginUI() {
  if (localStorage.getItem('isLoggedIn') === 'true' && !document.getElementById('userIcon')) {
    let elementsF = document.querySelectorAll(".nav-cont-2");
    if (elementsF.length > 0) {
      elementsF.forEach(element => {
        const userIcon = document.createElement('a');
        userIcon.id = 'userIcon';
        userIcon.textContent = '👤 ' + localStorage.getItem('userName');
        userIcon.style.borderRadius = '50%';
        userIcon.style.display = 'inline-block';
        userIcon.href = '#userProfile';
        element.insertBefore(userIcon, element.firstChild);
      });
    } else {
      console.error("لم يتم العثور على عناصر بفئة '.nav-cont-2'.");
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  insertLoginBox();
  checkLoginState();
});
