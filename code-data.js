// Complete Code Data for all screens
const codeData = {
    register: {
        title: 'شاشة التسجيل',
        path: 'lib/screens/auth/register_screen.dart',
        description: 'شاشة إنشاء حساب جديد مع التحقق من البيانات',
        code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../constants/app_theme.dart';
import '../../providers/auth_provider.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});
  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _phoneCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _confirmPassCtrl = TextEditingController();
  bool _obscure = true;

  @override
  void dispose() {
    _nameCtrl.dispose(); _emailCtrl.dispose(); _phoneCtrl.dispose();
    _passCtrl.dispose(); _confirmPassCtrl.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    final ok = await context.read<AuthProvider>().register(
      _nameCtrl.text.trim(), _emailCtrl.text.trim(),
      _passCtrl.text, _phoneCtrl.text.trim(),
    );
    if (ok && mounted) {
      Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('إنشاء حساب جديد')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              const Icon(Icons.person_add_rounded, size: 80, color: AppColors.primary),
              const SizedBox(height: 8),
              const Text('أنشئ حسابك الآن', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              const SizedBox(height: 24),
              TextFormField(
                controller: _nameCtrl,
                decoration: const InputDecoration(labelText: 'الاسم الكامل', prefixIcon: Icon(Icons.person_outline)),
                validator: (v) => v!.isEmpty ? 'الاسم مطلوب' : null,
              ),
              const SizedBox(height: 14),
              TextFormField(
                controller: _emailCtrl,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(labelText: 'البريد الإلكتروني', prefixIcon: Icon(Icons.email_outlined)),
                validator: (v) => v!.contains('@') ? null : 'بريد غير صالح',
              ),
              const SizedBox(height: 14),
              TextFormField(
                controller: _phoneCtrl,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(labelText: 'رقم الهاتف', prefixIcon: Icon(Icons.phone_outlined)),
                validator: (v) => v!.length < 9 ? 'رقم قصير' : null,
              ),
              const SizedBox(height: 14),
              TextFormField(
                controller: _passCtrl,
                obscureText: _obscure,
                decoration: InputDecoration(
                  labelText: 'كلمة المرور',
                  prefixIcon: const Icon(Icons.lock_outline),
                  suffixIcon: IconButton(
                    icon: Icon(_obscure ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscure = !_obscure),
                  ),
                ),
                validator: (v) => v!.length < 6 ? '6 أحرف على الأقل' : null,
              ),
              const SizedBox(height: 14),
              TextFormField(
                controller: _confirmPassCtrl,
                obscureText: _obscure,
                decoration: const InputDecoration(labelText: 'تأكيد كلمة المرور', prefixIcon: Icon(Icons.lock_outline)),
                validator: (v) => v != _passCtrl.text ? 'كلمة المرور غير متطابقة' : null,
              ),
              const SizedBox(height: 24),
              Consumer<AuthProvider>(
                builder: (_, auth, __) => auth.error != null
                    ? Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(color: Colors.red[50], borderRadius: BorderRadius.circular(8)),
                        child: Text(auth.error!, style: const TextStyle(color: Colors.red)),
                      )
                    : const SizedBox.shrink(),
              ),
              const SizedBox(height: 16),
              Consumer<AuthProvider>(
                builder: (_, auth, __) => SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton(
                    onPressed: auth.loading ? null : _register,
                    child: auth.loading
                        ? const CircularProgressIndicator(color: Colors.white)
                        : const Text('إنشاء الحساب', style: TextStyle(fontSize: 16)),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('لديك حساب بالفعل؟'),
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('سجل دخولك', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
    },
    
    orders: {
        title: 'شاشة الطلبات',
        path: 'lib/screens/orders/orders_screen.dart',
        description: 'عرض جميع طلبات المستخدم مع تفاصيل كل طلب وحالته',
        code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../constants/app_theme.dart';
import '../../models/order_model.dart';
import '../../providers/auth_provider.dart';
import '../../services/order_service.dart';

class OrdersScreen extends StatelessWidget {
  const OrdersScreen({super.key});

  Color _statusColor(OrderStatus s) {
    switch (s) {
      case OrderStatus.pending:    return Colors.orange;
      case OrderStatus.confirmed:  return Colors.blue;
      case OrderStatus.processing: return Colors.purple;
      case OrderStatus.shipped:    return Colors.teal;
      case OrderStatus.delivered:  return Colors.green;
      case OrderStatus.cancelled:  return Colors.red;
    }
  }

  IconData _statusIcon(OrderStatus s) {
    switch (s) {
      case OrderStatus.pending:    return Icons.pending_actions;
      case OrderStatus.confirmed:  return Icons.check_circle_outline;
      case OrderStatus.processing: return Icons.inventory_2_outlined;
      case OrderStatus.shipped:    return Icons.local_shipping_outlined;
      case OrderStatus.delivered:  return Icons.done_all;
      case OrderStatus.cancelled:  return Icons.cancel_outlined;
    }
  }

  @override
  Widget build(BuildContext context) {
    final userId = context.read<AuthProvider>().user?.uid ?? '';

    return Scaffold(
      appBar: AppBar(title: const Text('طلباتي')),
      body: StreamBuilder<List<OrderModel>>(
        stream: OrderService().getUserOrders(userId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.receipt_long_outlined, size: 80, color: Colors.grey),
                  SizedBox(height: 16),
                  Text('لا توجد طلبات بعد', style: TextStyle(fontSize: 18, color: Colors.grey)),
                  SizedBox(height: 8),
                  Text('ابدأ تسوقك الآن!', style: TextStyle(color: Colors.grey)),
                ],
              ),
            );
          }
          final orders = snapshot.data!;
          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: orders.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final order = orders[index];
              final color = _statusColor(order.status);
              return Card(
                child: ExpansionTile(
                  leading: CircleAvatar(
                    backgroundColor: color.withOpacity(0.15),
                    child: Icon(_statusIcon(order.status), color: color, size: 22),
                  ),
                  title: Text(
                    'طلب #\${order.id.substring(0, 8).toUpperCase()}',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(order.statusText,
                            style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.bold)),
                      ),
                      const SizedBox(height: 4),
                      Text('\${order.items.length} منتجات • \$\${order.grandTotal.toStringAsFixed(2)}',
                          style: const TextStyle(fontSize: 12, color: AppColors.textGrey)),
                    ],
                  ),
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('المنتجات:', style: TextStyle(fontWeight: FontWeight.bold)),
                          const SizedBox(height: 8),
                          ...order.items.map((item) => Padding(
                            padding: const EdgeInsets.symmetric(vertical: 4),
                            child: Row(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(8),
                                  child: Image.network(item.productImage,
                                      width: 45, height: 45, fit: BoxFit.cover,
                                      errorBuilder: (_, __, ___) => const Icon(Icons.image, size: 45)),
                                ),
                                const SizedBox(width: 12),
                                Expanded(child: Text(item.productTitle, style: const TextStyle(fontSize: 13))),
                                Text('×\${item.quantity}', style: const TextStyle(color: AppColors.textGrey)),
                                const SizedBox(width: 8),
                                Text('\$\${item.total.toStringAsFixed(2)}',
                                    style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
                              ],
                            ),
                          )),
                          const Divider(height: 24),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('المجموع:'),
                              Text('\$\${order.totalAmount.toStringAsFixed(2)}'),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('التوصيل:'),
                              Text('\$\${order.deliveryFee.toStringAsFixed(2)}'),
                            ],
                          ),
                          const Divider(),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('الإجمالي:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                              Text('\$\${order.grandTotal.toStringAsFixed(2)}',
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.primary)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}`
    },
    
    account: {
        title: 'شاشة الحساب',
        path: 'lib/screens/account/account_screen.dart',
        description: 'إدارة بيانات المستخدم الشخصية وتحديثها',
        code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../constants/app_theme.dart';
import '../../models/user_model.dart';
import '../../providers/auth_provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});
  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameCtrl;
  late TextEditingController _phoneCtrl;
  late TextEditingController _addressCtrl;
  late TextEditingController _cityCtrl;
  bool _editing = false;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    final user = context.read<AuthProvider>().user;
    _nameCtrl    = TextEditingController(text: user?.name ?? '');
    _phoneCtrl   = TextEditingController(text: user?.phone ?? '');
    _addressCtrl = TextEditingController(text: user?.address ?? '');
    _cityCtrl    = TextEditingController(text: user?.city ?? '');
  }

  @override
  void dispose() {
    _nameCtrl.dispose(); _phoneCtrl.dispose();
    _addressCtrl.dispose(); _cityCtrl.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    final user = context.read<AuthProvider>().user!;
    final updated = user.copyWith(
      name: _nameCtrl.text.trim(),
      phone: _phoneCtrl.text.trim(),
      address: _addressCtrl.text.trim(),
      city: _cityCtrl.text.trim(),
    );
    await FirebaseFirestore.instance.collection('users').doc(user.uid).update(updated.toMap());
    context.read<AuthProvider>().updateUser(updated);
    setState(() { _loading = false; _editing = false; });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('تم حفظ البيانات بنجاح ✅'), backgroundColor: Colors.green),
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final user = auth.user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('حسابي'),
        actions: [
          IconButton(
            icon: Icon(_editing ? Icons.close : Icons.edit_outlined),
            onPressed: () => setState(() => _editing = !_editing),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFF1A237E), Color(0xFF3F51B5)]),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 45,
                      backgroundColor: Colors.white,
                      child: Text(
                        user?.name.isNotEmpty == true ? user!.name[0].toUpperCase() : 'G',
                        style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: Color(0xFF1A237E)),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(user?.name ?? '', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                    Text(user?.email ?? '', style: const TextStyle(color: Colors.white70, fontSize: 14)),
                    if (user?.isAdmin == true)
                      Container(
                        margin: const EdgeInsets.only(top: 8),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(color: AppColors.accent, borderRadius: BorderRadius.circular(20)),
                        child: const Text('مدير النظام', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                      ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              
              _buildField(_nameCtrl, 'الاسم الكامل', Icons.person_outline, enabled: _editing),
              const SizedBox(height: 14),
              _buildField(_phoneCtrl, 'رقم الهاتف', Icons.phone_outlined, enabled: _editing, keyboard: TextInputType.phone),
              const SizedBox(height: 14),
              _buildField(_addressCtrl, 'العنوان', Icons.location_on_outlined, enabled: _editing),
              const SizedBox(height: 14),
              _buildField(_cityCtrl, 'المدينة', Icons.location_city_outlined, enabled: _editing),
              const SizedBox(height: 24),

              if (_editing)
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton(
                    onPressed: _loading ? null : _save,
                    child: _loading
                        ? const CircularProgressIndicator(color: Colors.white)
                        : const Text('حفظ التغييرات', style: TextStyle(fontSize: 16)),
                  ),
                ),

              const Divider(height: 40),
              _menuItem(context, Icons.receipt_long_outlined, 'طلباتي', () => Navigator.pushNamed(context, '/orders')),
              if (user?.isAdmin == true)
                _menuItem(context, Icons.admin_panel_settings_outlined, 'لوحة الإدارة', () => Navigator.pushNamed(context, '/admin'), color: AppColors.accent),
              _menuItem(context, Icons.logout_rounded, 'تسجيل الخروج', () async {
                await auth.logout();
                Navigator.pushReplacementNamed(context, '/login');
              }, color: AppColors.error),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildField(TextEditingController ctrl, String label, IconData icon, {bool enabled = true, TextInputType keyboard = TextInputType.text}) {
    return TextFormField(
      controller: ctrl,
      enabled: enabled,
      keyboardType: keyboard,
      decoration: InputDecoration(labelText: label, prefixIcon: Icon(icon)),
      validator: (v) => v!.isEmpty ? '$label مطلوب' : null,
    );
  }

  Widget _menuItem(BuildContext ctx, IconData icon, String title, VoidCallback onTap, {Color? color}) {
    return ListTile(
      leading: Icon(icon, color: color ?? AppColors.primary),
      title: Text(title, style: TextStyle(color: color, fontWeight: FontWeight.w500)),
      trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
      onTap: onTap,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      tileColor: (color ?? AppColors.primary).withOpacity(0.05),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
    );
  }
}`
    },
    
    checkout: {
        title: 'شاشة الدفع',
        path: 'lib/screens/checkout/checkout_screen.dart',
        description: 'إتمام عملية الشراء وإنشاء الطلب',
        code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/cart_provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/order_service.dart';
import '../../models/order_model.dart';
import '../../constants/app_theme.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});
  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _formKey = GlobalKey<FormState>();
  final _addressCtrl = TextEditingController();
  final _cityCtrl = TextEditingController();
  final _phoneCtrl = TextEditingController();
  final _notesCtrl = TextEditingController();
  String _paymentMethod = 'cash';
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    final user = context.read<AuthProvider>().user;
    if (user != null) {
      _phoneCtrl.text = user.phone;
      _addressCtrl.text = user.address;
      _cityCtrl.text = user.city;
    }
  }

  @override
  void dispose() {
    _addressCtrl.dispose(); _cityCtrl.dispose();
    _phoneCtrl.dispose(); _notesCtrl.dispose();
    super.dispose();
  }

  Future<void> _submitOrder() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);

    final cart = context.read<CartProvider>();
    final user = context.read<AuthProvider>().user!;

    final order = OrderModel(
      id: '',
      userId: user.uid,
      userName: user.name,
      userPhone: _phoneCtrl.text,
      deliveryAddress: _addressCtrl.text,
      city: _cityCtrl.text,
      items: cart.itemList.map((i) => OrderItem(
        productId: i.product.id,
        productTitle: i.product.titleAr,
        productImage: i.product.mainImage,
        price: i.product.finalPrice,
        quantity: i.quantity,
      )).toList(),
      totalAmount: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      status: OrderStatus.pending,
      paymentMethod: _paymentMethod,
      notes: _notesCtrl.text.isNotEmpty ? _notesCtrl.text : null,
      createdAt: DateTime.now(),
    );

    final orderId = await OrderService().createOrder(order);
    cart.clear();

    if (mounted) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.check_circle_rounded, color: Colors.green, size: 80),
              const SizedBox(height: 16),
              const Text('تم تأكيد طلبك!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Text('رقم الطلب: #\${orderId.substring(0, 8).toUpperCase()}',
                  style: const TextStyle(color: AppColors.textGrey)),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false),
                child: const Text('العودة للرئيسية'),
              ),
            ],
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('إتمام الطلب')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Order Summary
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.primary.withOpacity(0.2)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('ملخص الطلب', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 12),
                    ...cart.itemList.map((item) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('\${item.product.titleAr} ×\${item.quantity}',
                              style: const TextStyle(fontSize: 13)),
                          Text('\$\${(item.product.finalPrice * item.quantity).toStringAsFixed(2)}',
                              style: const TextStyle(fontWeight: FontWeight.bold)),
                        ],
                      ),
                    )),
                    const Divider(),
                    Row(mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [const Text('الإجمالي', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                        Text('\$\${cart.total.toStringAsFixed(2)}',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.primary))]),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Delivery Info
              const Text('بيانات التوصيل', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              TextFormField(
                controller: _phoneCtrl,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(labelText: 'رقم الهاتف', prefixIcon: Icon(Icons.phone_outlined)),
                validator: (v) => v!.length < 9 ? 'رقم غير صالح' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _addressCtrl,
                decoration: const InputDecoration(labelText: 'العنوان التفصيلي', prefixIcon: Icon(Icons.location_on_outlined)),
                validator: (v) => v!.isEmpty ? 'مطلوب' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _cityCtrl,
                decoration: const InputDecoration(labelText: 'المدينة', prefixIcon: Icon(Icons.location_city_outlined)),
                validator: (v) => v!.isEmpty ? 'مطلوب' : null,
              ),
              const SizedBox(height: 24),

              // Payment Method
              const Text('طريقة الدفع', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => _paymentMethod = 'cash'),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: _paymentMethod == 'cash' ? AppColors.primary.withOpacity(0.1) : Colors.grey[100],
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: _paymentMethod == 'cash' ? AppColors.primary : Colors.grey[300]!,
                            width: _paymentMethod == 'cash' ? 2 : 1,
                          ),
                        ),
                        child: Column(
                          children: [
                            Icon(Icons.payments_outlined,
                                color: _paymentMethod == 'cash' ? AppColors.primary : Colors.grey),
                            const SizedBox(height: 8),
                            Text('دفع عند الاستلام',
                                style: TextStyle(
                                    color: _paymentMethod == 'cash' ? AppColors.primary : Colors.grey,
                                    fontWeight: FontWeight.bold, fontSize: 12),
                                textAlign: TextAlign.center),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton.icon(
                  onPressed: _loading ? null : _submitOrder,
                  icon: _loading
                      ? const SizedBox(width: 20, height: 20,
                          child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                      : const Icon(Icons.check_circle_outlined),
                  label: Text(_loading ? 'جاري المعالجة...' : 'تأكيد الطلب',
                      style: const TextStyle(fontSize: 18)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
    }
};

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.codeData = codeData;
}