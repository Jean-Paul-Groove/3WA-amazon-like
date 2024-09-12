export const formatDateFRComplete = (date ) => {
    const optionsDate = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };

    const optionsTime = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // format 24h
    };

    const newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString('fr-FR', optionsDate);
    const formattedTime = newDate.toLocaleTimeString('fr-FR', optionsTime);

    return `${formattedDate} - ${formattedTime}`;
};
export const formatDate = (date ) => {
    const optionsDate = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };

    const optionsTime = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // format 24h
    };

    const newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString('fr-FR', optionsDate);
    const formattedTime = newDate.toLocaleTimeString('fr-FR', optionsTime);

    return `${formattedDate} - ${formattedTime}`;
};
export const formatTime = (date ) => {

    const optionsTime = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // format 24h
    };

    const newDate = new Date(date);

    const formattedTime = newDate.toLocaleTimeString('fr-FR', optionsTime);

    return `${formattedTime}`;
};