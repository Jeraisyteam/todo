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
    input.value = '';
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
function handleOTPInput(event, input) {
  // Handle numeric inputs and limit to one character
  if (event.inputType === "insertText" && !isNaN(event.data)) {
      input.value = event.data;  // Ensure only the last entered number is kept
      const nextInput = input.nextElementSibling;
      if (nextInput && nextInput.classList.contains('new-verification-box')) {
          nextInput.focus();
      }
  }

  // Handling backspace for deleting and navigating
  if (event.key === "Backspace") {
      if (input.value === '') {
          // Move focus to previous input if current is empty and backspace is pressed
          const previousInput = input.previousElementSibling;
          if (previousInput && previousInput.classList.contains('new-verification-box')) {
              previousInput.focus();
          }
      } else {
          // Clear current input
          input.value = '';
      }
  }
}

// Setup event listeners for each OTP input box
function setupOTPInputListeners() {
  const otpInputs = document.querySelectorAll('.new-verification-box');
  otpInputs.forEach(input => {
      input.addEventListener('input', (event) => handleOTPInput(event, input));
      input.addEventListener('keydown', (event) => {
          if (event.key === "Backspace") {
              handleOTPInput(event, input);
          }
      });
  });
}



function setupEventListeners() {
  document.querySelectorAll('.new-verification-box').forEach(input => {
      // Handling numeric input and backspace for navigation
      input.addEventListener('keydown', (event) => {
          if (event.key >= '0' && event.key <= '9' && input.value.length === 0) {
              // Allows only one digit per box, automatically advances
              setTimeout(() => {
                  if (input.nextElementSibling && input.nextElementSibling.classList.contains('new-verification-box')) {
                      input.nextElementSibling.focus();
                  }
              }, 10); // Small delay to ensure the character is processed
          } else if (event.key === "Backspace") {
              if (input.value === '') {
                  // Move to previous input only if current is already empty
                  const previousInput = input.previousElementSibling;
                  if (previousInput && previousInput.classList.contains('new-verification-box')) {
                      previousInput.focus();
                  }
              } else {
                  // Clear current input
                  setTimeout(() => input.value = '', 10);
              }
          } else if (event.key.match(/[^0-9]/)) {
              // Prevent non-numeric characters
              event.preventDefault();
          }
      });
  });

  const loginButton = document.getElementById('openLoginModal');
  if (loginButton) {
      loginButton.onclick = () => showModal('loginModal');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  checkLoginState();
});

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
  var phoneNumber = document.getElementById("editable-part").value.trim();
  console.log("Editable Phone Part:", phoneNumber);  // Debug user input

  var countryCode = document.getElementById('dial-code').textContent.trim();
  console.log("Country Code from Element:", countryCode);  // Debug country code

  var fullPhoneNumber = countryCode + phoneNumber;
  console.log("Combined Full Phone Number:", fullPhoneNumber);  // Check combined result

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