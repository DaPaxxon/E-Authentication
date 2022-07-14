
const deleteBtns = document.querySelectorAll(".deleteUser");


deleteBtns.forEach((deleteBtn) => {
    let userId = deleteBtn.getAttribute("data-userId");

    deleteBtn.addEventListener("click", () => {
        let yes = confirm("Are you sure you want to delete this user?")
        if (yes) {
            window.location.href = `/delete/users/${userId}`;
        }
    })
})
