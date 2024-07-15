// export const imageUrl = "http://195.35.45.56:8002/uploads/"
// export const MainUrl = "http://195.35.45.56:8002/"
export const imageUrl = "http://localhost:8002/uploads/"
export const MainUrl = "http://localhost:8002/"
// export const MainUrl = "http://api.coachingtest.com/"
// export const imageUrl = "http://api.coachingtest.com/uploads/"


export const endPoint = {
    categoryGet:"book/get-category",
    getBookList:"book/get-books",
    getAllEbooks:"book/getAllEBooks",
    getBookContentById:"book/get-books-content-by-id",
    getBookContentFileById:"book/get-books-content-file-by-id",
    getBooksByCategory:"book/get-books-by-category-id",
    getPoster:"book/get-poster",
    getPermotionModal:"book/getPermotionModal",
    getFlashMessages:"auth/get-flash-message",
    login:"auth/login",
    signup:"auth/signup",
    profile:"auth/profile",
    setProfile:"profile/updateProfile",
    changePassword:"profile/changepassword",
    updateEmailMobile:"profile/updateEmailAndMobile",
    forgotPassword:"auth/forgotpassword",
    changeforgotPassword:"auth/change-forgot-password",
    getOtp:"auth/get-otp",
    verifyOtp:"auth/verifyOtp",
    addNewsLetter:"book/add-newsletter",
    addToCart:"book/add-book-to-cart",
    addToCartByUserId:"book/add-book-to-cart-by-userid",
    getBooksFromCart:"book/get-book-from-cart-by-ip",
    getBookFromCartByUserId:"book/get-book-from-cart-by-userid",
    addSupport:"support/add-support-request",
    removeItem:"book/remove-item-from-cart",
    promotionAndOffer:"book/get-permotion-&-offer",
    socialMediaUrl:"socialmedia/get-social-media-url",
    trendingTitleAndImages:"book/get-trending-title-&-images",
    adminInformation:"book/get-admin-info",
    bookDetailsById:"book/get-bookdetail-by-id",
    getcarttotalamountandquentity:"book/get-cart-info",
    getcarttotalamountandquentityyuserid:"book/get-cart-info-by-userid",
    getCurrentAffairs:"currentAffairs/getCurrentAffairsFiles",
    getTestSeries:"testSeries/getTestSeries",
    addTypingForm:"typing/addTypingForm",

    getAllDesign:"design/getAllDesign",
    check_design_for_free:"design/check-design-plan",

    addDataTranslate:"datatranslate/addDataTranslateFormDetails",
    getallPreviousYearPaper:"paper/getallPreviousYearPaper",
    checkSubscriptionForCa:"currentAffairs/check-user-subscription",

    checkSubscriptionForTs:"testSeries/check-user-subscription",

    create_order:"order/create-order",
    payment_capture:"order/payment-capture",
    get_subscription_plans:"order/get-subscription-plans",

}