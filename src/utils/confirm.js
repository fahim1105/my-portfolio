import Swal from 'sweetalert2';

export const confirmDelete = (itemName = 'this item') =>
    Swal.fire({
        title: 'Are you sure?',
        html: `<span style="color:#9ca3af;font-size:14px;">
                 <strong style="color:#f9fafb">"${itemName}"</strong> will be permanently deleted.
               </span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',

        // Dark glassmorphism theme matching portfolio
        background: '#0f172a',
        color: '#f9fafb',
        iconColor: '#f87171',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#1f2937',

        customClass: {
            popup: 'swal-portfolio-popup',
            title: 'swal-portfolio-title',
            confirmButton: 'swal-portfolio-confirm',
            cancelButton: 'swal-portfolio-cancel',
        },

        didOpen: () => {
            // Inject styles once
            if (!document.getElementById('swal-portfolio-styles')) {
                const style = document.createElement('style');
                style.id = 'swal-portfolio-styles';
                style.textContent = `
                    .swal-portfolio-popup {
                        border-radius: 24px !important;
                        border: 1px solid rgba(255,255,255,0.08) !important;
                        backdrop-filter: blur(20px) !important;
                        padding: 32px !important;
                        box-shadow: 0 25px 60px rgba(0,0,0,0.6) !important;
                    }
                    .swal-portfolio-title {
                        font-size: 20px !important;
                        font-weight: 700 !important;
                        color: #f9fafb !important;
                    }
                    .swal-portfolio-confirm {
                        border-radius: 12px !important;
                        padding: 10px 24px !important;
                        font-size: 13px !important;
                        font-weight: 600 !important;
                        letter-spacing: 0.3px !important;
                    }
                    .swal-portfolio-cancel {
                        border-radius: 12px !important;
                        padding: 10px 24px !important;
                        font-size: 13px !important;
                        font-weight: 600 !important;
                        color: #9ca3af !important;
                        border: 1px solid rgba(255,255,255,0.1) !important;
                    }
                    .swal-portfolio-cancel:hover {
                        background: rgba(255,255,255,0.05) !important;
                        color: #f9fafb !important;
                    }
                    .swal2-icon.swal2-warning {
                        border-color: #f87171 !important;
                        color: #f87171 !important;
                    }
                `;
                document.head.appendChild(style);
            }
        },
    });
