export const formatDate = (date) => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(date);

    console.log('new date:', newDate);
    
    return newDate.toLocaleDateString('fr-FR', options);
};