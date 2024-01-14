import { Component, tags } from '@odoo/owl';

export class FooterComponent extends Component {
    static template = tags.xml`
    <footer class="footer">
            
  <div class="subscribe-email-main">
    <h1>اشترك في القائمة البريدية للحصول على آخر العروض والأخبار</h1>
    <div class="inp-btn">
      <input type="text" name="" id="" placeholder="البريد الالكتروني">
      <a href="#">ارسل</a>
    </div>
  </div>
  <div class="footer-content">
    <div class="footer-section decoration">
      <svg   class="decoration-image" width="131" height="318" viewBox="-4 0 131 318" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.8789 581.438C32.7809 539.084 26.8639 495.344 22.3066 453.373C17.6332 410.334 14.2554 367.578 6.52939 323.959C2.77964 302.79 -1.17704 281.515 -3.45861 260.561C-5.66161 240.328 -5.91391 220.885 -3.50986 202.637C0.872556 169.367 11.9846 140.825 14.5467 106.337C16.8704 75.0559 8.34272 37.0721 17.2916 9.64887C18.3743 6.33043 19.7456 3.50107 21.5266 0.979018C22.4806 -0.37184 23.9165 1.40702 24.6203 3.13497C25.5564 5.43222 25.6062 7.94878 24.8517 9.5997C22.2407 15.3148 20.1595 21.6723 19.1696 28.8062C18.1719 35.9969 17.9944 43.645 18.1439 51.4226C18.4606 67.8529 20.1149 84.8012 19.7339 100.957C18.9132 135.776 8.78246 164.375 2.89842 195.783C-0.172071 212.172 -1.64983 229.394 -0.547615 248.016C0.657673 268.383 4.2336 289.343 7.88482 310.175C11.5643 331.167 14.9303 352.03 17.4341 372.851C19.9687 393.927 21.9316 414.877 23.99 435.842C28.0697 477.394 32.7201 519.489 43.8308 561.864C45.2556 567.297 46.7135 572.731 48.2749 578.149C48.6627 579.493 49.2464 582.027 48.5945 582.943C47.9531 583.845 47.2731 582.623 46.8789 581.438Z" fill="white" fill-opacity="0.5"/>
        <path d="M50.0186 565.982C30.2219 484.478 30.0431 405.528 18.4805 325.17C15.5339 304.691 11.167 284.025 8.4232 263.584C5.98444 245.415 5.5207 228.075 7.26823 211.546C10.5444 180.561 19.7931 153.771 22.8456 122.638C24.459 106.179 23.2764 88.7017 23.0008 71.3984C22.7533 55.8476 23.3159 37.378 31.3901 28.5731C33.1946 26.6053 34.5563 33.0295 33.7481 34.6048C31.0426 39.8777 28.8425 45.7013 27.8171 52.5212C26.8343 59.0598 26.6578 66.0737 26.7551 73.1777C26.9584 88.0794 28.4035 103.436 27.6731 117.949C26.0933 149.327 17.2107 175.832 12.6256 205.202C10.2302 220.547 9.15361 236.621 10.7344 253.9C12.5116 273.328 16.7963 293.269 19.8688 312.911C26.0735 352.574 29.0601 391.607 32.5705 430.677C36.5492 474.959 41.2266 519.362 51.5249 564.613C51.7143 565.445 52.1665 568.074 51.4526 568.299C50.6849 568.54 50.2186 566.806 50.0186 565.982Z" fill="white" fill-opacity="0.5"/>
        <path d="M55.3806 562.627C48.3371 528.093 42.8355 493.481 38.5399 459.279C34.2555 425.165 31.5914 391.546 29.1217 357.898C27.885 341.049 26.5705 324.166 24.6002 307.125C22.6185 289.984 19.5268 272.852 16.7724 255.607C14.1932 239.461 14.5504 224.916 16.2278 210.462C18.0272 194.956 20.3899 179.777 22.4906 164.464C24.8457 147.291 27.1994 130.118 29.5718 112.957C30.6955 104.827 31.5997 96.4926 32.9971 88.5504C34.0531 82.5466 35.8154 76.3585 40.4871 75.016C43.0364 74.2831 44.8577 82.7717 42.7063 83.3888C38.5726 84.5745 37.3041 90.055 36.4954 95.4289C35.3839 102.815 34.4189 110.305 33.3843 117.742C31.3215 132.571 29.2447 147.391 27.1671 162.21C25.045 177.348 22.9203 192.486 20.8167 207.636C18.9022 221.424 17.1986 235.384 19.2618 251.022C20.3525 259.291 22.0396 267.647 23.3891 275.952C24.7588 284.381 25.9439 292.794 26.9295 301.159C28.8439 317.411 30.2298 333.549 31.4283 349.618C33.8854 382.556 35.8829 415.316 39.6489 448.612C43.908 486.27 49.8401 524.102 56.8334 562.161C57.256 564.46 56.0154 565.739 55.3806 562.627Z" fill="white" fill-opacity="0.5"/>
        <path d="M61.0565 560.431C51.0749 496.177 41.2892 431.29 39.6866 369.031C39.2936 353.772 39.304 338.656 38.3755 323.199C37.4357 307.556 34.9088 291.976 31.4494 275.933C28.1246 260.514 24.6469 244.982 23.6343 229.86C22.5843 214.187 24.9913 200.134 26.9351 186.039C29.1662 169.861 31.4001 153.684 33.6343 137.509C34.6298 130.303 35.1051 122.296 37.0592 115.798C38.5278 110.913 41.1924 106.821 46.0695 109.388C48.1518 110.483 49.0508 118.266 46.7915 117.407C42.6071 115.815 40.8336 120.741 39.997 125.062C38.7001 131.759 38.0007 138.989 37.0223 145.909C35.041 159.926 33.0589 173.943 31.0743 187.957C29.1478 201.563 26.4667 215.191 27.1188 230.212C27.7577 244.93 31.3864 260.324 34.5762 275.414C37.7872 290.603 40.2638 305.486 41.365 320.358C42.4685 335.262 42.5163 349.807 42.7558 364.398C43.2486 394.378 45.4227 424.993 48.8092 455.875C52.6243 490.665 57.6843 525.669 62.6297 560.67C63.0665 563.762 61.5436 563.567 61.0565 560.431Z" fill="white" fill-opacity="0.5"/>
        <path d="M70.0104 567.297C56.8077 503.975 51.4959 440.835 48.8521 379.743C48.1897 364.439 47.7152 349.205 47.3097 333.996C46.9077 318.926 46.4359 303.736 44.6168 288.223C42.754 272.337 38.7694 256.479 35.55 240.484C32.5366 225.512 31.1341 211.17 31.73 197.178C32.3712 182.113 35.0601 168.195 38.1666 154.77C39.6083 148.539 40.8308 141.867 42.9617 136.235C44.7275 131.57 47.4022 127.608 52.1556 128.829C54.5258 129.438 55.6618 136.939 53.3287 136.74C49.2685 136.395 47.1889 140.954 45.8726 145.22C44.2679 150.422 43.0854 156.064 41.8126 161.544C39.083 173.296 36.7417 185.412 35.8502 198.421C34.9403 211.7 36.1067 225.437 38.9547 239.828C41.9397 254.91 45.7476 269.944 47.6748 284.947C51.5585 315.18 50.8193 344.34 51.8119 373.666C52.8088 403.12 54.3749 432.816 57.0323 462.804C60.0557 496.922 64.8697 531.325 71.4228 566.042C71.5706 566.825 72.0294 569.215 71.3465 569.431C70.6516 569.651 70.1714 568.07 70.0104 567.297Z" fill="white" fill-opacity="0.5"/>
        <path d="M77.2014 569.164C65.4774 512.145 58.4589 455.005 56.7936 400.069C55.9633 372.683 57.1699 346.246 56.9106 319.113C56.7822 305.646 56.1474 291.918 54.1519 277.89C52.1136 263.563 48.4274 249.128 45.7005 234.748C40.2034 205.762 41.0821 177.534 49.7809 155.946C51.3369 152.085 54.2892 159.997 53.3151 162.517C45.989 181.477 44.1269 204.821 48.3635 230.139C50.7368 244.321 54.4176 258.582 56.7265 272.761C58.9349 286.324 59.9137 299.711 60.2355 312.775C60.8917 339.424 59.2165 365.074 59.575 391.605C59.9372 418.412 61.5816 445.739 64.2808 473.308C67.3414 504.569 72.2424 536.268 78.5011 568.009C78.6476 568.751 79.0519 570.898 78.431 571.128C77.8009 571.361 77.342 569.847 77.2014 569.164Z" fill="white" fill-opacity="0.5"/>
        <path d="M83.8161 564.123C75.1267 511.444 66.8572 458.167 64.115 406.738C62.7757 381.623 63.453 357.45 63.5907 332.94C63.7323 307.724 62.2449 282.101 58.5154 255.691C56.6447 242.441 53.7228 228.968 52.2598 215.796C51.0312 204.737 50.7174 192.469 55.3828 185.228C57.0987 182.566 59.2818 190.435 58.5419 192.253C55.4846 199.767 55.0992 208.374 56.3205 218.391C57.693 229.648 60.0448 241.086 61.6909 252.391C65.4357 278.108 67.346 303.411 67.339 328.021C67.332 352.348 66.1507 376.133 66.992 400.821C67.8504 426.008 70.1282 451.728 73.2082 477.546C76.6483 506.383 81.2498 535.404 85.4997 564.379C85.5947 565.024 85.8256 567.236 85.0745 567.059C84.3097 566.879 83.929 564.808 83.8161 564.123Z" fill="white" fill-opacity="0.5"/>
        </svg>
        
    </div> 
  

    <div class="footer-section contact d-r">
      <p class="f-h">تواصل معنا</p>
      <p class="f-p">info@najdhksa.com</p>
      <p class="f-p">Saudi Arabia</p>
      <p class="f-p">920000239</p>
    </div>
    <div class="footer-section links s-r">
      <a href="#" class="f-h">الخدمات</a>
      <a href="#" class="f-p">خدمة الزيارة</a>
      <a href="#" class="f-p">خدمة المفيمة</a>
      <a href="#" class="f-p">برنامج الولاء</a>
    </div>
    <div class="footer-section links beside-r">
      <a href="#" class="f-h">المعلومات</a>
      <a href="#" class="f-p">اتصل بنا</a>
      <a href="#" class="f-p">الشروط والاحكام</a>
      <a href="#" class="f-p">سياسة الخصوصية</a>
    </div>
  
  
    <div class="footer-section social">
      <img src="https://gcdnb.pbrd.co/images/3ZgSvTfYhD7q.png?o=1" alt="Company Logo" class="company-logo">
      <div class="footer-social-icons">
        <a href="your-twitter-link" class="twitter-icon"><i class="fa-brands fa-twitter"></i></a>
        <a href="your-facebook-link" class="facebook-icon"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="your-linkedin-link" class="linkedin-icon"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
    <div class="footer-bottom">
  
  <p style=" font-family: Poppins;font-size: 16px;font-weight: 500;
  
  ">جميع الحقوق محفوظة لدى نجدة</p>
      <div class="bt-2">
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="#">Cookies</a>
    </div>
    </div>
  </div>
</footer>`;
}


