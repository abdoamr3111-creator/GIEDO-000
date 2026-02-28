// App Screens Data and Rendering
const screens = {
    splash: {
        html: `
            <div style="background: linear-gradient(135deg, #1A237E, #3F51B5); width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;">
                <div style="animation: pulse 2s infinite;">
                    <i class="fas fa-shopping-bag" style="font-size: 100px; margin-bottom: 30px;"></i>
                </div>
                <h1 style="font-size: 32px; font-weight: 900; margin-bottom: 10px;">Giedo Digital Mall</h1>
                <p style="font-size: 16px; opacity: 0.9;">متجرك الرقمي المتكامل</p>
                <div style="margin-top: 40px;">
                    <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                </div>
            </div>
            <style>
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `
    },
    
    home: {
        html: `
            <div style="width: 100%; height: 100%; overflow-y: auto; background: #F5F5F5;">
                <!-- App Bar -->
                <div style="background: linear-gradient(135deg, #1A237E, #3F51B5); padding: 20px; color: white;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-bars" style="font-size: 24px;"></i>
                            <span style="font-size: 18px; font-weight: 700;">Giedo Mall</span>
                        </div>
                        <div style="position: relative;">
                            <i class="fas fa-shopping-cart" style="font-size: 24px;"></i>
                            <div style="position: absolute; top: -5px; right: -8px; background: #FF6F00; width: 18px; height: 18px; border-radius: 50%; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</div>
                        </div>
                    </div>
                    <div style="margin-top: 15px;">
                        <p style="font-size: 13px; opacity: 0.9;">مرحباً بك 👋</p>
                        <h2 style="font-size: 18px; font-weight: 700; margin-top: 3px;">اكتشف أحدث المنتجات</h2>
                    </div>
                </div>
                
                <!-- Banner -->
                <div style="padding: 15px;">
                    <div style="background: linear-gradient(135deg, #FF6F00, #FF8F00); border-radius: 16px; padding: 25px; color: white;">
                        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">🔥 تخفيضات نهاية الموسم</h3>
                        <p style="font-size: 13px; opacity: 0.95; margin-bottom: 15px;">خصم حتى 50%</p>
                        <div style="background: white; color: #FF6F00; padding: 8px 16px; border-radius: 8px; display: inline-block; font-size: 13px; font-weight: 700;">تسوق الآن</div>
                    </div>
                </div>
                
                <!-- Categories -->
                <div style="padding: 0 15px;">
                    <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">التصنيفات</h3>
                    <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px;">
                        <div style="min-width: 70px; text-align: center;">
                            <div style="width: 60px; height: 60px; background: #E3F2FD; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
                                <i class="fas fa-laptop" style="font-size: 26px; color: #1565C0;"></i>
                            </div>
                            <span style="font-size: 11px;">إلكترونيات</span>
                        </div>
                        <div style="min-width: 70px; text-align: center;">
                            <div style="width: 60px; height: 60px; background: #FFF3E0; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
                                <i class="fas fa-tshirt" style="font-size: 26px; color: #E65100;"></i>
                            </div>
                            <span style="font-size: 11px;">ملابس</span>
                        </div>
                        <div style="min-width: 70px; text-align: center;">
                            <div style="width: 60px; height: 60px; background: #E8F5E9; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
                                <i class="fas fa-book" style="font-size: 26px; color: #2E7D32;"></i>
                            </div>
                            <span style="font-size: 11px;">كتب</span>
                        </div>
                        <div style="min-width: 70px; text-align: center;">
                            <div style="width: 60px; height: 60px; background: #F3E5F5; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
                                <i class="fas fa-watch" style="font-size: 26px; color: #6A1B9A;"></i>
                            </div>
                            <span style="font-size: 11px;">إكسسوارات</span>
                        </div>
                    </div>
                </div>
                
                <!-- Products -->
                <div style="padding: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <h3 style="font-size: 16px; font-weight: 700;">منتجات مميزة 🔥</h3>
                        <span style="font-size: 12px; color: #FF6F00; font-weight: 600;">عرض الكل</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <!-- Product 1 -->
                        <div style="background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div style="position: relative;">
                                <div style="width: 100%; height: 140px; background: linear-gradient(135deg, #667eea, #764ba2);"></div>
                                <div style="position: absolute; top: 8px; left: 8px; background: #C62828; color: white; padding: 4px 8px; border-radius: 8px; font-size: 10px; font-weight: 700;">-20%</div>
                            </div>
                            <div style="padding: 12px;">
                                <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 6px; line-height: 1.3;">سماعة بلوتوث لاسلكية</h4>
                                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                                    <i class="fas fa-star" style="font-size: 11px; color: #FFA000;"></i>
                                    <span style="font-size: 11px; color: #757575;">4.5</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <span style="font-size: 15px; font-weight: 700; color: #1A237E;">$39.99</span>
                                        <span style="font-size: 11px; color: #9E9E9E; text-decoration: line-through; margin-right: 4px;">$49.99</span>
                                    </div>
                                    <div style="width: 32px; height: 32px; background: #1A237E; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-plus" style="font-size: 12px; color: white;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Product 2 -->
                        <div style="background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div style="width: 100%; height: 140px; background: linear-gradient(135deg, #f093fb, #f5576c);"></div>
                            <div style="padding: 12px;">
                                <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 6px; line-height: 1.3;">حذاء رياضي نايكي</h4>
                                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                                    <i class="fas fa-star" style="font-size: 11px; color: #FFA000;"></i>
                                    <span style="font-size: 11px; color: #757575;">4.7</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="font-size: 15px; font-weight: 700; color: #1A237E;">$89.99</span>
                                    <div style="width: 32px; height: 32px; background: #1A237E; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-plus" style="font-size: 12px; color: white;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    
    products: {
        html: `
            <div style="width: 100%; height: 100%; overflow-y: auto; background: #F5F5F5;">
                <!-- App Bar -->
                <div style="background: linear-gradient(135deg, #1A237E, #3F51B5); padding: 20px; color: white;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <i class="fas fa-arrow-right" style="font-size: 20px;"></i>
                        <span style="font-size: 18px; font-weight: 700;">جميع المنتجات</span>
                        <div style="flex: 1;"></div>
                        <i class="fas fa-search" style="font-size: 20px;"></i>
                    </div>
                    
                    <!-- Filter Chips -->
                    <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 5px;">
                        <div style="background: white; color: #1A237E; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; white-space: nowrap;">الكل</div>
                        <div style="background: rgba(255,255,255,0.2); color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; white-space: nowrap;">إلكترونيات</div>
                        <div style="background: rgba(255,255,255,0.2); color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; white-space: nowrap;">ملابس</div>
                        <div style="background: rgba(255,255,255,0.2); color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; white-space: nowrap;">كتب</div>
                    </div>
                </div>
                
                <!-- Products Grid -->
                <div style="padding: 15px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        ${[1,2,3,4,5,6].map(i => `
                            <div style="background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                                <div style="width: 100%; height: 140px; background: linear-gradient(135deg, ${i % 2 === 0 ? '#667eea, #764ba2' : '#f093fb, #f5576c'});"></div>
                                <div style="padding: 12px;">
                                    <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 6px;">منتج ${i}</h4>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="font-size: 15px; font-weight: 700; color: #1A237E;">$${29 + i * 10}.99</span>
                                        <i class="fas fa-plus-circle" style="font-size: 24px; color: #1A237E;"></i>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `
    },
    
    details: {
        html: `
            <div style="width: 100%; height: 100%; overflow-y: auto; background: #F5F5F5;">
                <!-- Image -->
                <div style="position: relative;">
                    <div style="width: 100%; height: 280px; background: linear-gradient(135deg, #667eea, #764ba2);"></div>
                    <div style="position: absolute; top: 15px; right: 15px; width: 40px; height: 40px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-arrow-right" style="color: #1A237E;"></i>
                    </div>
                    <div style="position: absolute; top: 15px; left: 15px; width: 40px; height: 40px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-heart" style="color: #C62828;"></i>
                    </div>
                </div>
                
                <!-- Content -->
                <div style="background: white; border-radius: 24px 24px 0 0; margin-top: -20px; position: relative; padding: 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                        <div style="flex: 1;">
                            <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">سماعة بلوتوث لاسلكية</h2>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <div style="display: flex;">
                                    ${[1,2,3,4,5].map(i => `<i class="fas fa-star" style="font-size: 14px; color: ${i <= 4 ? '#FFA000' : '#E0E0E0'};"></i>`).join('')}
                                </div>
                                <span style="font-size: 13px; color: #757575;">(128 تقييم)</span>
                            </div>
                        </div>
                        <div style="text-align: left;">
                            <div style="font-size: 28px; font-weight: 700; color: #1A237E;">$39.99</div>
                            <div style="font-size: 14px; color: #9E9E9E; text-decoration: line-through;">$49.99</div>
                        </div>
                    </div>
                    
                    <div style="background: #F5F5F5; padding: 15px; border-radius: 12px; margin: 20px 0;">
                        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 8px;">الوصف</h3>
                        <p style="font-size: 13px; color: #757575; line-height: 1.7;">سماعة لاسلكية عالية الجودة مع خاصية إلغاء الضوضاء وبطارية تدوم 30 ساعة. مثالية للاستخدام اليومي والرياضة.</p>
                    </div>
                    
                    <div style="background: #1A237E; color: white; padding: 16px; border-radius: 14px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 16px; font-weight: 700;">
                        <i class="fas fa-shopping-cart"></i>
                        <span>أضف إلى السلة</span>
                    </div>
                </div>
            </div>
        `
    },
    
    cart: {
        html: `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; background: #F5F5F5;">
                <!-- App Bar -->
                <div style="background: linear-gradient(135deg, #1A237E, #3F51B5); padding: 20px; color: white;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <i class="fas fa-arrow-right" style="font-size: 20px;"></i>
                        <span style="font-size: 18px; font-weight: 700;">سلة التسوق</span>
                    </div>
                </div>
                
                <!-- Cart Items -->
                <div style="flex: 1; overflow-y: auto; padding: 15px;">
                    ${[1,2,3].map(i => `
                        <div style="background: white; border-radius: 14px; padding: 15px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div style="display: flex; gap: 12px;">
                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; flex-shrink: 0;"></div>
                                <div style="flex: 1;">
                                    <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 6px;">منتج ${i}</h4>
                                    <div style="font-size: 15px; font-weight: 700; color: #1A237E; margin-bottom: 8px;">$${29 + i * 10}.99</div>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="width: 28px; height: 28px; background: #FFEBEE; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                            <i class="fas fa-minus" style="font-size: 12px; color: #C62828;"></i>
                                        </div>
                                        <span style="font-size: 14px; font-weight: 600;">${i}</span>
                                        <div style="width: 28px; height: 28px; background: #E8F5E9; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                            <i class="fas fa-plus" style="font-size: 12px; color: #2E7D32;"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Bottom Summary -->
                <div style="background: white; padding: 20px; box-shadow: 0 -4px 12px rgba(0,0,0,0.08);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="font-size: 14px; color: #757575;">المجموع</span>
                        <span style="font-size: 14px; font-weight: 600;">$119.97</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #E0E0E0;">
                        <span style="font-size: 14px; color: #757575;">التوصيل</span>
                        <span style="font-size: 14px; font-weight: 600;">$5.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <span style="font-size: 16px; font-weight: 700;">الإجمالي</span>
                        <span style="font-size: 20px; font-weight: 700; color: #1A237E;">$124.97</span>
                    </div>
                    <div style="background: #1A237E; color: white; padding: 16px; border-radius: 14px; text-align: center; font-size: 16px; font-weight: 700;">
                        إتمام الطلب
                    </div>
                </div>
            </div>
        `
    },
    
    checkout: {
        html: `
            <div style="width: 100%; height: 100%; overflow-y: auto; background: #F5F5F5;">
                <!-- App Bar -->
                <div style="background: linear-gradient(135deg, #1A237E, #3F51B5); padding: 20px; color: white;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <i class="fas fa-arrow-right" style="font-size: 20px;"></i>
                        <span style="font-size: 18px; font-weight: 700;">إتمام الطلب</span>
                    </div>
                </div>
                
                <!-- Form -->
                <div style="padding: 20px;">
                    <!-- Order Summary -->
                    <div style="background: #E3F2FD; padding: 20px; border-radius: 14px; margin-bottom: 20px; border: 2px solid #1565C0;">
                        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 12px; color: #1A237E;">ملخص الطلب</h3>
                        <div style="font-size: 13px; color: #424242; line-height: 2;">
                            <div style="display: flex; justify-content: space-between;"><span>منتج 1 ×1</span><span>$29.99</span></div>
                            <div style="display: flex; justify-content: space-between;"><span>منتج 2 ×2</span><span>$79.98</span></div>
                            <div style="display: flex; justify-content: space-between;"><span>التوصيل</span><span>$5.00</span></div>
                            <div style="border-top: 1px solid #90CAF9; margin: 8px 0; padding-top: 8px; display: flex; justify-content: space-between; font-weight: 700; font-size: 15px; color: #1A237E;">
                                <span>الإجمالي</span><span>$114.97</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Delivery Info -->
                    <div style="background: white; padding: 20px; border-radius: 14px; margin-bottom: 20px;">
                        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 15px;">بيانات التوصيل</h3>
                        <div style="margin-bottom: 12px;">
                            <div style="background: #F5F5F5; border-radius: 10px; padding: 14px; font-size: 13px;">
                                <i class="fas fa-phone" style="color: #1A237E; margin-left: 8px;"></i>
                                +967 777 123 456
                            </div>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <div style="background: #F5F5F5; border-radius: 10px; padding: 14px; font-size: 13px;">
                                <i class="fas fa-map-marker-alt" style="color: #1A237E; margin-left: 8px;"></i>
                                شارع الزبيري، صنعاء
                            </div>
                        </div>
                        <div>
                            <div style="background: #F5F5F5; border-radius: 10px; padding: 14px; font-size: 13px;">
                                <i class="fas fa-city" style="color: #1A237E; margin-left: 8px;"></i>
                                صنعاء
                            </div>
                        </div>
                    </div>
                    
                    <!-- Payment Method -->
                    <div style="background: white; padding: 20px; border-radius: 14px; margin-bottom: 20px;">
                        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 15px;">طريقة الدفع</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div style="background: #E3F2FD; border: 2px solid #1565C0; border-radius: 12px; padding: 16px; text-align: center;">
                                <i class="fas fa-money-bill-wave" style="font-size: 28px; color: #1A237E; margin-bottom: 8px;"></i>
                                <div style="font-size: 12px; font-weight: 600; color: #1A237E;">دفع عند الاستلام</div>
                            </div>
                            <div style="background: #F5F5F5; border: 2px solid #E0E0E0; border-radius: 12px; padding: 16px; text-align: center; opacity: 0.6;">
                                <i class="fas fa-credit-card" style="font-size: 28px; color: #757575; margin-bottom: 8px;"></i>
                                <div style="font-size: 12px; font-weight: 600; color: #757575;">بطاقة بنكية</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Submit Button -->
                    <div style="background: #2E7D32; color: white; padding: 16px; border-radius: 14px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 16px; font-weight: 700;">
                        <i class="fas fa-check-circle"></i>
                        <span>تأكيد الطلب</span>
                    </div>
                </div>
            </div>
        `
    }
};

// Initialize Screen Switching
const screenButtons = document.querySelectorAll('.screen-btn');
const phoneScreen = document.getElementById('phoneScreen');

screenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const screenName = btn.getAttribute('data-screen');
        
        // Update active button
        screenButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show screen with animation
        phoneScreen.style.opacity = '0';
        setTimeout(() => {
            phoneScreen.innerHTML = screens[screenName].html;
            phoneScreen.style.opacity = '1';
        }, 200);
    });
});

// Load initial screen
if (phoneScreen && screens.splash) {
    phoneScreen.innerHTML = screens.splash.html;
}