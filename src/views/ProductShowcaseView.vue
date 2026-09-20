<template>
  <div class="container py-5" dir="rtl">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h1 class="fw-bold text-dark">المعرض التفاعلي - FurniStyle</h1>
        <p class="text-muted">اختر الغرفة وتعرف على تفاصيل الأثاث وتعديل الألوان</p>
      </div>
    </div>

    <!-- Interactive Showcase Section -->
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 p-4 bg-white rounded-4 text-center py-5">
          <div class="py-5">
            <i class="bi bi-box-seam display-1 text-secondary mb-3"></i>
            <h3>منطقة عرض الغرفة التفاعلية</h3>
            <p class="text-muted">جاري تحميل عناصر المعرض وتخصيص الألوان...</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm border-0 p-4 bg-white rounded-4">
          <h4 class="fw-bold mb-3">خصائص المواد والألوان</h4>
          <p class="text-muted small">قم بتعديل وتخصيص الأثاث الخاص بك بكل سهولة.</p>
          <hr>
          <div class="d-grid gap-2">
            <button class="btn btn-dark btn-sm">غرفة المعيشة</button>
            <button class="btn btn-outline-dark btn-sm">غرفة النوم</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// منطق المعرض التفاعلي الخاص بـ furnistyle-app
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
</style>