from supabase import create_client, ClientOptions
import getpass
import httpx

pc = getpass.getuser()

http_client = httpx.Client(trust_env=False)

options = ClientOptions(httpx_client=http_client)

DataBase = create_client("https://wnrdvmrnegvqdojtlaod.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducmR2bXJuZWd2cWRvanRsYW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxODQ4MDAsImV4cCI6MjA4Mjc2MDgwMH0.ZF18GTWCo2dhlYozzZ-5GdcQ8kwqNEQPxMGYf9Rstiw", options)

def create_champion(champion_name, skin_name, from_who=pc):
    data = {
        "champ": champion_name,
        "skin": skin_name,
        "from": from_who
    }
    try:
        return DataBase.table("data").insert(data).execute().data
    except Exception as e:
        return e
    

def get_data():
    return DataBase.table("data").select("*").execute().data


def update_data(champion_name, skin_name, from_who=pc):
    return DataBase.table("data").update({"skin": skin_name, "from": from_who}).eq("champ", champion_name).execute().data

# for i in open("./champs.txt", 'r').read().split("^"):
#     print(create_champion(i, "", pc))

# print(get_data())