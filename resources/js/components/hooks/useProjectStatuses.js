const useprojectStatusCountes = () => {
    const statuses = {
        waiting: {
            name: 'waiting',
            text: 'Chờ thi công',
            type: 'warning',
            fa: 'fa-hourglass-half'
        },
        under_construction: {
            name: 'under_construction',
            text: 'Đang thi công',
            type: 'info',
            fa: 'fa-wrench'
        },
        completed: {
            name: 'completed',
            text: 'Đã hoàn thành',
            type: 'success',
            fa: 'fa-check'
        },
        approved: {
            name: 'approved',
            text: 'Đã duyệt',
            type: 'primary',
            fa: 'fa-check'
        },
        suspended: {
            name: 'suspended',
            text: 'Tạm dừng',
            type: 'warning',
            fa: 'fa-warning'
        },
        cancelled: {
            name: 'cancelled',
            text: 'Đã hủy',
            type: 'danger',
            fa: 'fa-close'
        }
    }

    return statuses
}

export default useprojectStatusCountes
