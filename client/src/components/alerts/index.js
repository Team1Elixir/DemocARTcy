import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const errorAlert = (error) => {
  Toast.fire({
  icon: 'error',
  title: error
  })
}

export const successAlert = (message) => Toast.fire({
  icon: 'success',
  title: message
})