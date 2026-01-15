<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="show"
          class="fixed inset-0 z-50 flex items-center justify-center px-4"
          @click.self="handleClose"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          <!-- Modal Content Wrapper - Lazy loaded -->
          <div class="relative w-full max-w-lg">
            <LazyBusinessInfoModal
              :show="show"
              :request-id="requestId"
              @close="handleClose"
              @submit="handleSubmit"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  requestId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'submit'])

function handleClose() {
  emit('close')
}

function handleSubmit(data) {
  emit('submit', data)
}

// Close on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
      handleClose()
    }
  }
  window.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
