let accounts = [
  { platform: "Instagram", username: "user1", points: 0 },
  { platform: "YouTube", username: "channel1", points: 0 }
];

let currentUser = null;
let userPoints = 0; // رصيد النقاط الخاص بالمستخدم

// تسجيل الدخول
function login() {
  let email = document.getElementById("email").value;
  if (email) {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPoints", 0); // أول مرة يبدأ بـ 0
    currentUser = email;
    userPoints = 0;
    showApp();
  } else {
    alert("الرجاء إدخال البريد الإلكتروني");
  }
}

// عرض واجهة التطبيق
function showApp() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("promo").style.display = "block";
  document.getElementById("accounts").style.display = "block";

  document.getElementById("user-info").innerHTML = `👤 مرحبًا: ${currentUser}`;
  
  // عرض النقاط
  userPoints = parseInt(localStorage.getItem("userPoints")) || 0;
  document.getElementById("user-points").innerText = `🏆 نقاطك: ${userPoints}`;

  renderAccounts();
}

// إضافة حساب جديد
function addAccount() {
  let username = prompt("أدخل اسم حسابك (بدون @):");
  if (!username) return;

  let platform = prompt("اختر المنصة: (Instagram, Facebook, TikTok, YouTube, X)");
  if (!platform) platform = "Instagram";

  accounts.push({ platform, username, points: 0 });
  renderAccounts();
}

// دالة ترجع أيقونة حسب المنصة
function getPlatformIcon(platform) {
  switch (platform.toLowerCase()) {
    case "instagram": return '<i class="fab fa-instagram" style="color:#e1306c;"></i>';
    case "facebook": return '<i class="fab fa-facebook" style="color:#1877f2;"></i>';
    case "tiktok": return '<i class="fab fa-tiktok" style="color:#000;"></i>';
    case "youtube": return '<i class="fab fa-youtube" style="color:#ff0000;"></i>';
    case "x": return '<i class="fab fa-x-twitter" style="color:#000;"></i>';
    default: return '<i class="fas fa-user"></i>';
  }
}

// عرض الحسابات
function renderAccounts() {
  let list = document.getElementById("account-list");
  list.innerHTML = "";
  accounts.forEach((acc, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${getPlatformIcon(acc.platform)} 
      <b>@${acc.username}</b> 
      <small>(${acc.platform})</small>  
      <span>🏆 ${acc.points}</span>
      <button onclick="follow(${index})">متابعة ✅</button>
    `;
    list.appendChild(li);
  });
}

// متابعة حساب
function follow(index) {
  alert(`تمت متابعة @${accounts[index].username} على ${accounts[index].platform} 🎉`);
  
  // زيادة نقاط صاحب الحساب
  accounts[index].points += 1;

  // زيادة نقاط المستخدم
  userPoints += 1;
  localStorage.setItem("userPoints", userPoints);
  document.getElementById("user-points").innerText = `🏆 نقاطك: ${userPoints}`;

  renderAccounts();
}

// التحقق إذا المستخدم دخل قبل
window.onload = () => {
  let savedEmail = localStorage.getItem("userEmail");
  let savedPoints = localStorage.getItem("userPoints");

  if (savedEmail) {
    currentUser = savedEmail;
    userPoints = parseInt(savedPoints) || 0;
    showApp();
  }
};
