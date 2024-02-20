<template>
    <div class="container login-container">
        <div class="row justify-content-center">
            <div class="col-md-6 login-form-2">
                <h3>Question</h3>
                <form>
                    <div class="form-group my-2">
                        <input type="text" class="form-control" placeholder="Titre" value="" />
                    </div>
                    <div class="form-group my-2">
                        <select class="form-control" id="inputGroupSelect01">
                            <option selected>Quiz</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="form-group my-2">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Réponse 1" value="" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Réponse 2" value="" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group my-2">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Réponse 3" value="" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Réponse 4" value="" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" value="Ajouter+" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style src="./modifierQuestion.css"></style>