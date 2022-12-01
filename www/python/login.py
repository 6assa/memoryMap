from browser import document,alert
##headに<script type="text/javascript" src="brython\www\src\brython.js"></script>
##<script type="text/python" src="python/login.py">
##bodyにonload="brython()"つける
##ログインボタンにid="submit"つける


def execute(e):
    id=document["search-id"]
    pass=document["search-password"]
    alert(id+"&"+pass)

document["submit"].bind("click",execute)