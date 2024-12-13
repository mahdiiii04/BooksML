import joblib
import pandas as pd



def Recommend_Genres(read_vector, rules):
    liked_genres = set(read_vector[read_vector == 1].index)
    
    recommended_genres = set()

    for _, rule in rules.iterrows():
        antecedents = set(rule['antecedents'])
        consequents = set(rule['consequents'])
        
        if antecedents.issubset(liked_genres):
            recommended_genres.update(consequents)
    
    recommended_genres -= liked_genres
    
    return recommended_genres

def Vectorise_Read(read_books, books):
    my_rows = books[books['title'].isin(read_books)]  # Getting the read books data
    my_rows = my_rows.drop(['title', 'author', 'image', 'year', 'genres'], axis=1).sum()   # Keeping genres only + sum
    my_rows[my_rows > 1] = 1

    return my_rows

def Book_Suggestions(genres, books):
    to_suggest = books[list(genres)+['title', 'author', 'year', 'image', 'genres']].drop_duplicates(subset='title')
    to_suggest = to_suggest.copy()
    to_suggest['Total'] = to_suggest[list(genres)].sum(axis=1)
    to_suggest = to_suggest.drop(list(genres), axis=1)
    return to_suggest[to_suggest['Total'] == max(to_suggest['Total'])]


def Recommend(my_books):
    books = pd.read_csv('Books.csv')
    rules = joblib.load('AprioriRules.pkl')

    read_vector = Vectorise_Read(my_books, books)
    genres = Recommend_Genres(read_vector, rules)
    
    return Book_Suggestions(genres, books)

